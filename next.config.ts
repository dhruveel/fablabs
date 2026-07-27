import type { NextConfig } from "next";

// reCAPTCHA v3 (contact form) and the embedded Google Maps location on the
// contact page are the only third-party origins this app talks to.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://www.google.com",
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  // Dev mode's inline HMR/refresh scripts violate a strict CSP, so only
  // enforce it in production.
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: CSP }]
    : []),
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  // Emits a pruned .next/standalone server (only the deps actually reached
  // at runtime) so the Docker production image doesn't need node_modules.
  output: "standalone",

  compress: true,
  poweredByHeader: false,

  // lib/storage/quote-images.ts resolves its upload dir with
  // path.join(process.cwd(), ...) — a dynamic expression the file tracer
  // can't statically resolve, so it conservatively swept the entire project
  // (including all ~40MB of public/assets) into every route's serverless
  // bundle. No server route reads from public/assets at runtime — Next
  // serves those as static files directly — so it's safe to exclude broadly.
  outputFileTracingExcludes: {
    "/**": ["./public/assets/**"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Cache hashed assets forever — filenames change on update so safe to use immutable
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
