import { describe, expect, it, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const rateLimitOrNull = vi.fn().mockResolvedValue(null);
const verifyAdminCredentials = vi.fn().mockResolvedValue(true);
const createAdminSession = vi.fn().mockResolvedValue(undefined);

vi.mock("@/lib/rate-limit", () => ({ rateLimitOrNull }));
vi.mock("@/lib/auth/admin", () => ({ verifyAdminCredentials }));
vi.mock("@/lib/auth/session", () => ({ createAdminSession }));

const { POST } = await import("@/app/api/admin/login/route");

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/admin/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

describe("POST /api/admin/login", () => {
  beforeEach(() => {
    rateLimitOrNull.mockReset().mockResolvedValue(null);
    verifyAdminCredentials.mockReset().mockResolvedValue(true);
    createAdminSession.mockReset().mockResolvedValue(undefined);
  });

  it("returns the rate limiter's response untouched when rate-limited", async () => {
    const limited = new Response(null, { status: 429 });
    rateLimitOrNull.mockResolvedValue(limited);

    const res = await POST(makeRequest({ email: "admin@fablabs.in", password: "x" }));

    expect(res).toBe(limited);
    expect(verifyAdminCredentials).not.toHaveBeenCalled();
  });

  it("returns 400 for a malformed body", async () => {
    const res = await POST(makeRequest({ email: "not-an-email", password: "x" }));
    expect(res.status).toBe(400);
    expect(verifyAdminCredentials).not.toHaveBeenCalled();
  });

  it("returns 401 for wrong credentials without creating a session", async () => {
    verifyAdminCredentials.mockResolvedValue(false);

    const res = await POST(makeRequest({ email: "admin@fablabs.in", password: "wrong" }));

    expect(res.status).toBe(401);
    expect(createAdminSession).not.toHaveBeenCalled();
  });

  it("creates a session and returns 200 for correct credentials", async () => {
    const res = await POST(makeRequest({ email: "admin@fablabs.in", password: "correct" }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(createAdminSession).toHaveBeenCalledWith("admin@fablabs.in");
  });
});
