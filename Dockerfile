# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN corepack enable

# ---- deps: install with pnpm, cached separately from source changes ----
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ---- builder: compile the Next.js production build ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time-only values baked into client bundles. Server-only secrets
# (MONGODB_URI, SESSION_SECRET, SMTP_*, ...) must NOT be passed here —
# they belong in the runtime environment, injected at `docker run`/compose.
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# ---- runner: minimal production image ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Persisted quote-request reference images (lib/storage/quote-images.ts) —
# kept outside `public/` and only served via an authenticated admin route.
# Mount a named volume/bind mount here so uploads survive redeploys.
RUN mkdir -p /app/uploads/quote-images \
  && chown -R nextjs:nodejs /app/uploads

# Next's standalone output only copies the production node_modules subset
# actually reached at runtime, plus a server.js entrypoint.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
