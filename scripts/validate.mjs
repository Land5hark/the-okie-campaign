import { access, readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const canonicalPath = join(root, "character", "reference", "okie-canonical.jpg");
const canonical = await readFile(canonicalPath);
const canonicalHash = createHash("sha256").update(canonical).digest("hex");
const expectedCanonicalHash = "3cfcb1dec1e3b3bfe5d33c98c88cd38f6a0cf41f1431c91ca9eccd86db4eefae";

if (canonicalHash !== expectedCanonicalHash) {
  throw new Error("Canonical Okie reference has changed without approval.");
}

const dirs = (await readdir(join(root, "styles"), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory());

if (dirs.length !== 100) {
  throw new Error("Expected 100 style folders, found " + dirs.length);
}

const required = [
  "README.md",
  "AGENTS.md",
  "STYLE.md",
  "PROMPT.md",
  "QA.md",
  "MANIFEST.md",
  "style.json",
  "assets/reference/README.md",
  "assets/generated/README.md",
  "assets/exports/README.md"
];

for (const dir of dirs) {
  for (const file of required) {
    await access(join(root, "styles", dir.name, file));
  }
  const data = JSON.parse(await readFile(join(root, "styles", dir.name, "style.json"), "utf8"));
  if (data.required_text.pendant !== "OKIE" || data.required_text.speech_bubble !== "OKIE DOKIE") {
    throw new Error("Bad locked copy in " + dir.name);
  }
  if (data.canonical_reference !== "../../../character/reference/okie-canonical.jpg") {
    throw new Error("Bad canonical reference path in " + dir.name);
  }
}

console.log("Validated canonical Okie reference and " + dirs.length + " complete style packages.");
