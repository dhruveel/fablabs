// k6 load test — READ-ONLY PATHS AGAINST PRODUCTION ONLY.
// Never point this at /api/quote, /api/contact, or anything that writes
// data or sends email — those hit real SMTP, real reCAPTCHA quota, and
// write real rows into the production database.
//
// Install: https://k6.io/docs/get-started/installation/
// Run:     k6 run scripts/load-test/read-paths.js
// Tune load via env vars, e.g.:
//   k6 run -e VUS=20 -e DURATION=2m scripts/load-test/read-paths.js
import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "https://fablabs.in";

export const options = {
  vus: Number(__ENV.VUS || 10),
  duration: __ENV.DURATION || "1m",
  thresholds: {
    http_req_failed: ["rate<0.01"], // fail the run if >1% of requests error
    http_req_duration: ["p(95)<1000"], // 95% of requests under 1s
  },
};

const paths = ["/", "/fab", "/lab", "/our-story", "/community", "/contact", "/shop"];

export default function () {
  const path = paths[Math.floor(Math.random() * paths.length)];
  const res = http.get(`${BASE_URL}${path}`);
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(1);
}
