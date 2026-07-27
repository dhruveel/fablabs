// Stand-in for the `server-only` package under Vitest.
//
// `server-only`'s real `index.js` unconditionally throws — it relies on
// Next's webpack build swapping in `empty.js` via the `react-server` resolve
// condition for actual Server Components. Vitest doesn't apply that
// condition, so every `lib/**` module (`import 'server-only'` is the first
// line of nearly all of them) would throw on import. This file is aliased in
// vitest.config.ts to stand in for it instead.
export {};
