import { describe, expect, it, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const rateLimitOrNull = vi.fn().mockResolvedValue(null);
const verifyRecaptcha = vi.fn().mockResolvedValue(true);
const createContactSubmission = vi.fn().mockResolvedValue("some-id");

vi.mock("@/lib/rate-limit", () => ({ rateLimitOrNull }));
vi.mock("@/lib/recaptcha", () => ({ verifyRecaptcha }));
vi.mock("@/lib/db/contact", () => ({ createContactSubmission }));

const { POST } = await import("@/app/api/contact/route");

const validBody = {
  name: "Jane Doe",
  phone: "9876543210",
  email: "jane@example.com",
  subject: "Custom hoodies",
  message: "We need 50 hoodies for our college fest.",
  recaptchaToken: "token-123",
};

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", ...headers },
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    rateLimitOrNull.mockReset().mockResolvedValue(null);
    verifyRecaptcha.mockReset().mockResolvedValue(true);
    createContactSubmission.mockReset().mockResolvedValue("some-id");
  });

  it("returns the rate limiter's response untouched when rate-limited", async () => {
    const limited = new Response(null, { status: 429 });
    rateLimitOrNull.mockResolvedValue(limited);

    const res = await POST(makeRequest(validBody));

    expect(res).toBe(limited);
    expect(createContactSubmission).not.toHaveBeenCalled();
  });

  it("returns 400 for a malformed JSON body", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: "{not valid json",
      headers: { "content-type": "application/json" },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 with field errors for invalid form data", async () => {
    const res = await POST(makeRequest({ ...validBody, email: "not-an-email" }));
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.issues).toHaveProperty("email");
    expect(createContactSubmission).not.toHaveBeenCalled();
  });

  it("returns 400 when reCAPTCHA verification fails", async () => {
    verifyRecaptcha.mockResolvedValue(false);

    const res = await POST(makeRequest(validBody));

    expect(res.status).toBe(400);
    expect(createContactSubmission).not.toHaveBeenCalled();
  });

  it("saves the submission and returns 201 on the happy path", async () => {
    const res = await POST(makeRequest(validBody));

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ success: true });

    expect(createContactSubmission).toHaveBeenCalledTimes(1);
    const [savedArgs] = createContactSubmission.mock.calls[0];
    expect(savedArgs).toMatchObject({
      name: "Jane Doe",
      phone: "9876543210",
      email: "jane@example.com",
      subject: "Custom hoodies",
      message: "We need 50 hoodies for our college fest.",
    });
    // The recaptcha token itself is never persisted.
    expect(savedArgs).not.toHaveProperty("recaptchaToken");
  });

  it("passes the client IP from x-forwarded-for through to both recaptcha and storage", async () => {
    await POST(makeRequest(validBody, { "x-forwarded-for": "9.9.9.9, 1.1.1.1" }));

    expect(verifyRecaptcha).toHaveBeenCalledWith("token-123", "9.9.9.9", "contact");
    const [savedArgs] = createContactSubmission.mock.calls[0];
    expect(savedArgs.ip).toBe("9.9.9.9");
  });
});
