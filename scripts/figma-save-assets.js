// scripts/figma-save-assets.js
// Downloads given URLs to public/assets/ with safe filenames.
// Usage: node scripts/figma-save-assets.js

import fs from "fs";
import https from "https";
import { URL } from "url";

const assets = [
  {
    url: "https://www.figma.com/api/mcp/asset/4032ecb6-286b-49ed-9673-13625d470d1d",
    name: "figma-stats-full.png",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/fbb1ff7f-7efa-42bf-8d5e-c5ccc62b7cee",
    name: "figma-rect8.png",
  },
  {
    url: "https://www.figma.com/api/mcp/asset/1baafad2-2083-497c-95f6-f22c928571b4",
    name: "figma-rect15.png",
  },
];

if (!fs.existsSync("public/assets"))
  fs.mkdirSync("public/assets", { recursive: true });

for (const a of assets) {
  const outPath = `public/assets/${a.name}`;
  console.log("Downloading", a.url, "→", outPath);
  const u = new URL(a.url);
  https
    .get(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        headers: { "User-Agent": "node" },
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          console.error("Failed to download", a.url, "status", res.statusCode);
          return;
        }
        const file = fs.createWriteStream(outPath);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log("Saved", outPath);
        });
      },
    )
    .on("error", (err) => console.error("Error", err));
}
