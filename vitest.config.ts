import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["tests/**/*.test.ts"],
    env: {
      // Dummy values so modules that validate these at import/call time
      // (lib/db/mongodb.ts, lib/auth/session.ts) don't throw during tests
      // that never actually touch a real database or sign a real session.
      // Tests exercising DB-backed code mock `@/lib/db/mongodb` directly
      // rather than relying on this URI resolving to anything real.
      MONGODB_URI: "mongodb://localhost:27017/fablabs-test",
      MONGODB_DB: "fablabs-test",
      SESSION_SECRET: "test-session-secret-at-least-32-characters-long",
      RECAPTCHA_SECRET_KEY: "test-recaptcha-secret",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "server-only": path.resolve(__dirname, "tests/mocks/server-only-stub.js"),
    },
  },
});
