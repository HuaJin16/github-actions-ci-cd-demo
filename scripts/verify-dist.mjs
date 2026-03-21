import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

const requiredFiles = [
  "dist/index.html",
  "dist/styles.css",
  "dist/src/app.js",
  "dist/src/metrics.js"
];

for (const relativePath of requiredFiles) {
  const absolutePath = path.join(rootDir, relativePath);
  await access(absolutePath);
}

const builtHtml = await readFile(path.join(rootDir, "dist/index.html"), "utf8");

if (builtHtml.includes("__COMMIT_SHA__")) {
  throw new Error("Build output still contains __COMMIT_SHA__ placeholder.");
}

console.log("Build verification passed.");
