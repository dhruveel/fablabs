import { describe, expect, it } from "vitest";
import { ContactFormSchema } from "@/lib/validations/contact";
import { QuoteFormSchema } from "@/lib/validations/quote";
import {
  AdminLoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "@/lib/validations/admin";

describe("ContactFormSchema", () => {
  const valid = {
    name: "Jane Doe",
    phone: "9876543210",
    email: "jane@example.com",
    subject: "Custom hoodies",
    message: "We need 50 hoodies for our college fest.",
    recaptchaToken: "token-123",
  };

  it("accepts a fully valid submission", () => {
    const result = ContactFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("trims whitespace on string fields", () => {
    const result = ContactFormSchema.safeParse({ ...valid, name: "  Jane Doe  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Jane Doe");
  });

  it("rejects a name shorter than 2 characters", () => {
    const result = ContactFormSchema.safeParse({ ...valid, name: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = ContactFormSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("accepts a submission with no message", () => {
    const result = ContactFormSchema.safeParse({
      name: valid.name,
      phone: valid.phone,
      email: valid.email,
      subject: valid.subject,
      recaptchaToken: valid.recaptchaToken,
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.message).toBeUndefined();
  });

  it("treats a blank message as absent, not an empty string", () => {
    const result = ContactFormSchema.safeParse({ ...valid, message: "   " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.message).toBeUndefined();
  });

  it("rejects a missing recaptcha token", () => {
    const result = ContactFormSchema.safeParse({ ...valid, recaptchaToken: "" });
    expect(result.success).toBe(false);
  });
});

describe("QuoteFormSchema", () => {
  const valid = {
    name: "Karthik Raj",
    phone: "9876543210",
    recaptchaToken: "test-token",
  };

  it("accepts a submission with only the required fields", () => {
    const result = QuoteFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("accepts optional email and requirements when present", () => {
    const result = QuoteFormSchema.safeParse({
      ...valid,
      email: "karthik@example.com",
      requirements: "20 hoodies, navy blue, embroidered logo.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a phone number shorter than 7 characters", () => {
    const result = QuoteFormSchema.safeParse({ ...valid, phone: "123" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid optional email", () => {
    const result = QuoteFormSchema.safeParse({ ...valid, email: "nope" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing recaptcha token", () => {
    const result = QuoteFormSchema.safeParse({ ...valid, recaptchaToken: "" });
    expect(result.success).toBe(false);
  });
});

describe("AdminLoginSchema", () => {
  it("accepts a valid email/password pair", () => {
    const result = AdminLoginSchema.safeParse({
      email: "admin@fablabs.in",
      password: "anything",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an empty password", () => {
    const result = AdminLoginSchema.safeParse({ email: "admin@fablabs.in", password: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed email", () => {
    const result = AdminLoginSchema.safeParse({ email: "not-an-email", password: "x" });
    expect(result.success).toBe(false);
  });
});

describe("ForgotPasswordSchema", () => {
  it("accepts a valid email", () => {
    expect(ForgotPasswordSchema.safeParse({ email: "admin@fablabs.in" }).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(ForgotPasswordSchema.safeParse({ email: "nope" }).success).toBe(false);
  });
});

describe("ResetPasswordSchema", () => {
  const token = "reset-token";

  it("accepts a password meeting all complexity rules", () => {
    const result = ResetPasswordSchema.safeParse({ token, password: "Abcdef1!" });
    expect(result.success).toBe(true);
  });

  it("rejects a password shorter than 8 characters", () => {
    expect(ResetPasswordSchema.safeParse({ token, password: "Ab1!" }).success).toBe(false);
  });

  it("rejects a password with no letter", () => {
    expect(ResetPasswordSchema.safeParse({ token, password: "12345678!" }).success).toBe(false);
  });

  it("rejects a password with no number", () => {
    expect(ResetPasswordSchema.safeParse({ token, password: "Abcdefgh!" }).success).toBe(false);
  });

  it("rejects a password with no special character", () => {
    expect(ResetPasswordSchema.safeParse({ token, password: "Abcdefg1" }).success).toBe(false);
  });

  it("rejects a missing token", () => {
    expect(ResetPasswordSchema.safeParse({ token: "", password: "Abcdef1!" }).success).toBe(
      false,
    );
  });
});
