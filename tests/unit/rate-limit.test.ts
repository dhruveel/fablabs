import { describe, expect, it, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const findOneAndUpdate = vi.fn();

vi.mock("@/lib/db/mongodb", () => ({
  getDb: vi.fn(async () => ({
    collection: () => ({ findOneAndUpdate }),
  })),
}));

// Imported after the mock so rate-limit.ts picks up the mocked getDb.
const { getClientIp, checkRateLimit, rateLimitOrNull } = await import("@/lib/rate-limit");

function makeRequest(headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers,
  });
}

describe("getClientIp", () => {
  it("reads the first IP from x-forwarded-for", () => {
    const req = makeRequest({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("trims whitespace around the IP", () => {
    const req = makeRequest({ "x-forwarded-for": "  1.2.3.4  , 5.6.7.8" });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it('falls back to "unknown" when the header is missing', () => {
    expect(getClientIp(makeRequest())).toBe("unknown");
  });
});

describe("checkRateLimit", () => {
  beforeEach(() => {
    findOneAndUpdate.mockReset();
  });

  it("allows the request when the count is at or below max", async () => {
    findOneAndUpdate.mockResolvedValue({ count: 3 });
    const result = await checkRateLimit("contact", "1.2.3.4", { max: 5, windowMs: 60_000 });
    expect(result.allowed).toBe(true);
  });

  it("denies the request once the count exceeds max", async () => {
    findOneAndUpdate.mockResolvedValue({ count: 6 });
    const result = await checkRateLimit("contact", "1.2.3.4", { max: 5, windowMs: 60_000 });
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("treats a missing document count as the first request (count 1)", async () => {
    findOneAndUpdate.mockResolvedValue(null);
    const result = await checkRateLimit("contact", "1.2.3.4", { max: 5, windowMs: 60_000 });
    expect(result.allowed).toBe(true);
  });
});

describe("rateLimitOrNull", () => {
  beforeEach(() => {
    findOneAndUpdate.mockReset();
  });

  it("returns null when under the limit", async () => {
    findOneAndUpdate.mockResolvedValue({ count: 1 });
    const res = await rateLimitOrNull(makeRequest(), "contact", { max: 5, windowMs: 60_000 });
    expect(res).toBeNull();
  });

  it("returns a 429 response with a Retry-After header when over the limit", async () => {
    findOneAndUpdate.mockResolvedValue({ count: 999 });
    const res = await rateLimitOrNull(makeRequest(), "contact", { max: 5, windowMs: 60_000 });
    expect(res).not.toBeNull();
    expect(res!.status).toBe(429);
    expect(res!.headers.get("Retry-After")).toBeTruthy();

    const body = await res!.json();
    expect(body.error).toMatch(/too many requests/i);
  });
});
