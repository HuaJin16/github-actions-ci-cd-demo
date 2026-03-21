import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const distDir = path.join(rootDir, "dist");

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

await cp(path.join(rootDir, "index.html"), path.join(distDir, "index.html"));
await cp(path.join(rootDir, "styles.css"), path.join(distDir, "styles.css"));
await cp(path.join(rootDir, "src"), path.join(distDir, "src"), {
  recursive: true
});

const commitSha = (process.env.GITHUB_SHA || "local-dev").slice(0, 7);
const indexPath = path.join(distDir, "index.html");
const indexContents = await readFile(indexPath, "utf8");
const updatedContents = indexContents.replace(/__COMMIT_SHA__/g, commitSha);

await writeFile(indexPath, updatedContents, "utf8");

console.log(`Build complete. Commit stamp: ${commitSha}`);
