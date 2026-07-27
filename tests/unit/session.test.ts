import { describe, expect, it, vi, beforeEach } from "vitest";

// In-memory stand-in for Next's request-scoped cookie jar — the real
// `cookies()` only works inside an actual request lifecycle, which doesn't
// exist under Vitest.
const store = new Map<string, { value: string }>();

vi.mock("next/headers", () => ({
  cookies: async () => ({
    set: (name: string, value: string) => store.set(name, { value }),
    get: (name: string) => store.get(name),
    delete: (name: string) => store.delete(name),
  }),
}));

// `verifyAdminSession` is wrapped in React's `cache()`, which memoizes per
// request during an actual render. Outside a render there's no active
// request scope to key off, but re-importing fresh per test (instead of
// binding once at module scope) sidesteps relying on that undocumented
// behavior entirely.
async function loadSessionModule() {
  vi.resetModules();
  return import("@/lib/auth/session");
}

describe("admin session", () => {
  beforeEach(() => {
    store.clear();
  });

  it("round-trips: creating a session lets verifyAdminSession recover the email", async () => {
    const { createAdminSession, verifyAdminSession } = await loadSessionModule();
    await createAdminSession("admin@fablabs.in");
    const session = await verifyAdminSession();
    expect(session).toEqual({ email: "admin@fablabs.in" });
  });

  it("returns null when there is no session cookie", async () => {
    const { verifyAdminSession } = await loadSessionModule();
    expect(await verifyAdminSession()).toBeNull();
  });

  it("returns null for a garbage/tampered token", async () => {
    const { verifyAdminSession } = await loadSessionModule();
    store.set("admin_session", { value: "not-a-real-jwt" });
    expect(await verifyAdminSession()).toBeNull();
  });

  it("returns null after the session is deleted", async () => {
    const { createAdminSession, deleteAdminSession, verifyAdminSession } =
      await loadSessionModule();
    await createAdminSession("admin@fablabs.in");
    await deleteAdminSession();
    expect(await verifyAdminSession()).toBeNull();
  });
});
