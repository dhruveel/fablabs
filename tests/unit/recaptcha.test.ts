import { describe, expect, it, vi, afterEach } from "vitest";
import { verifyRecaptcha } from "@/lib/recaptcha";

const originalFetch = global.fetch;

function mockFetchResponse(body: unknown, ok = true) {
  global.fetch = vi.fn().mockResolvedValue({
    ok,
    json: async () => body,
  } as Response);
}

describe("verifyRecaptcha", () => {
  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("returns true for a successful, high-score, matching-action response", async () => {
    mockFetchResponse({ success: true, score: 0.9, action: "contact" });
    await expect(verifyRecaptcha("token", "1.2.3.4", "contact")).resolves.toBe(true);
  });

  it("returns false when Google's response is not ok", async () => {
    mockFetchResponse({}, false);
    await expect(verifyRecaptcha("token")).resolves.toBe(false);
  });

  it("returns false when success is false", async () => {
    mockFetchResponse({ success: false, score: 0.9 });
    await expect(verifyRecaptcha("token")).resolves.toBe(false);
  });

  it("returns false when the score is below the minimum threshold", async () => {
    mockFetchResponse({ success: true, score: 0.3 });
    await expect(verifyRecaptcha("token")).resolves.toBe(false);
  });

  it("returns false when the action doesn't match what was expected", async () => {
    mockFetchResponse({ success: true, score: 0.9, action: "login" });
    await expect(verifyRecaptcha("token", undefined, "contact")).resolves.toBe(false);
  });

  it("passes when no expected action is given, regardless of the response's action", async () => {
    mockFetchResponse({ success: true, score: 0.9, action: "anything" });
    await expect(verifyRecaptcha("token")).resolves.toBe(true);
  });

  it("throws when RECAPTCHA_SECRET_KEY is missing", async () => {
    const original = process.env.RECAPTCHA_SECRET_KEY;
    delete process.env.RECAPTCHA_SECRET_KEY;
    await expect(verifyRecaptcha("token")).rejects.toThrow(/RECAPTCHA_SECRET_KEY/);
    process.env.RECAPTCHA_SECRET_KEY = original;
  });
});
