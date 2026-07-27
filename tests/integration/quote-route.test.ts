import { describe, expect, it, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const rateLimitOrNull = vi.fn().mockResolvedValue(null);
const rateLimitByKeyOrNull = vi.fn().mockResolvedValue(null);
const createQuoteRequest = vi.fn().mockResolvedValue("some-id");
const saveQuoteImage = vi.fn().mockResolvedValue("saved-filename.png");
const verifyRecaptcha = vi.fn().mockResolvedValue(true);

vi.mock("@/lib/rate-limit", () => ({ rateLimitOrNull, rateLimitByKeyOrNull }));
vi.mock("@/lib/db/quote", () => ({ createQuoteRequest }));
vi.mock("@/lib/storage/quote-images", () => ({ saveQuoteImage }));
vi.mock("@/lib/recaptcha", () => ({ verifyRecaptcha }));

const { POST } = await import("@/app/api/quote/route");

// Smallest possible valid PNG signature — the route sniffs real file bytes
// rather than trusting the browser-supplied MIME type, so tests need actual
// magic bytes, not just a `type` string on the Blob/File.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function makeRequest(formData: FormData, headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost/api/quote", {
    method: "POST",
    body: formData,
    headers,
  });
}

function validFormData(overrides: Record<string, string> = {}) {
  const fd = new FormData();
  fd.set("name", overrides.name ?? "Karthik Raj");
  fd.set("phone", overrides.phone ?? "9876543210");
  fd.set("recaptchaToken", overrides.recaptchaToken ?? "test-token");
  if (overrides.email !== undefined) fd.set("email", overrides.email);
  if (overrides.requirements !== undefined) fd.set("requirements", overrides.requirements);
  return fd;
}

describe("POST /api/quote", () => {
  beforeEach(() => {
    rateLimitOrNull.mockReset().mockResolvedValue(null);
    rateLimitByKeyOrNull.mockReset().mockResolvedValue(null);
    createQuoteRequest.mockReset().mockResolvedValue("some-id");
    saveQuoteImage.mockReset().mockResolvedValue("saved-filename.png");
    verifyRecaptcha.mockReset().mockResolvedValue(true);
  });

  it("returns 400 when reCAPTCHA verification fails", async () => {
    verifyRecaptcha.mockResolvedValue(false);

    const res = await POST(makeRequest(validFormData()));
    expect(res.status).toBe(400);
    expect(createQuoteRequest).not.toHaveBeenCalled();
  });

  it("rate-limits by destination email independent of IP", async () => {
    const limited = new Response(null, { status: 429 });
    rateLimitByKeyOrNull.mockResolvedValue(limited);

    const res = await POST(makeRequest(validFormData({ email: "victim@example.com" })));
    expect(res).toBe(limited);
    expect(createQuoteRequest).not.toHaveBeenCalled();
  });

  it("returns the rate limiter's response untouched when rate-limited", async () => {
    const limited = new Response(null, { status: 429 });
    rateLimitOrNull.mockResolvedValue(limited);

    const res = await POST(makeRequest(validFormData()));

    expect(res).toBe(limited);
    expect(createQuoteRequest).not.toHaveBeenCalled();
  });

  it("returns 413 when Content-Length exceeds the max allowed size", async () => {
    const res = await POST(
      makeRequest(validFormData(), { "content-length": String(10 * 1024 * 1024) }),
    );
    expect(res.status).toBe(413);
    expect(createQuoteRequest).not.toHaveBeenCalled();
  });

  it("returns 400 with field errors for invalid form data", async () => {
    const res = await POST(makeRequest(validFormData({ phone: "1" })));
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.issues).toHaveProperty("phone");
    expect(createQuoteRequest).not.toHaveBeenCalled();
  });

  it("saves the request with no image and returns 201 on the happy path", async () => {
    const res = await POST(makeRequest(validFormData()));

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ success: true });
    expect(saveQuoteImage).not.toHaveBeenCalled();

    expect(createQuoteRequest).toHaveBeenCalledTimes(1);
    const [savedArgs] = createQuoteRequest.mock.calls[0];
    expect(savedArgs).toMatchObject({
      name: "Karthik Raj",
      phone: "9876543210",
      email: null,
      requirements: null,
      image: null,
    });
  });

  it("treats blank optional fields as absent (null), not empty strings", async () => {
    const fd = validFormData({ email: "   ", requirements: "" });
    const res = await POST(makeRequest(fd));

    expect(res.status).toBe(201);
    const [savedArgs] = createQuoteRequest.mock.calls[0];
    expect(savedArgs.email).toBeNull();
    expect(savedArgs.requirements).toBeNull();
  });

  it("rejects an image over 5MB even when Content-Length is missing/understated", async () => {
    const big = Buffer.concat([PNG_MAGIC, Buffer.alloc(6 * 1024 * 1024)]);
    const fd = validFormData();
    fd.set("image", new File([big], "ref.png", { type: "image/png" }));

    const res = await POST(makeRequest(fd));
    expect(res.status).toBe(400);
    expect(createQuoteRequest).not.toHaveBeenCalled();
  });

  it("rejects a file whose real bytes don't match any supported image format", async () => {
    const fd = validFormData();
    fd.set(
      "image",
      new File([Buffer.from("not actually an image")], "ref.png", { type: "image/png" }),
    );

    const res = await POST(makeRequest(fd));
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toMatch(/valid png, jpeg, gif, or webp/i);
    expect(createQuoteRequest).not.toHaveBeenCalled();
  });

  it("sniffs the real file type from bytes rather than trusting a spoofed MIME type", async () => {
    const fd = validFormData();
    // Real PNG bytes, but the browser/client claims it's something else.
    fd.set("image", new File([PNG_MAGIC], "ref.png", { type: "application/octet-stream" }));

    const res = await POST(makeRequest(fd));
    expect(res.status).toBe(201);

    const [savedArgs] = createQuoteRequest.mock.calls[0];
    expect(savedArgs.image).toEqual({
      filename: "saved-filename.png",
      originalName: "ref.png",
      contentType: "image/png",
    });
  });

  it("saves a valid image and includes it on the quote request", async () => {
    const fd = validFormData();
    fd.set("image", new File([PNG_MAGIC], "reference.png", { type: "image/png" }));

    const res = await POST(makeRequest(fd));

    expect(res.status).toBe(201);
    expect(saveQuoteImage).toHaveBeenCalledTimes(1);
    const [buffer, contentType] = saveQuoteImage.mock.calls[0];
    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(contentType).toBe("image/png");
  });
});
