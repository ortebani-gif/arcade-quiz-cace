// Vérifie que chaque image du catalogue existe dans public/images/characters/.
// Lancer depuis la racine du projet : node scripts/check-assets.mjs
import { readFileSync, readdirSync } from "node:fs";

const src = readFileSync("src/data/characters.ts", "utf8");
const used = [...src.matchAll(/"image":\s*"([^"]+)"/g)].map((m) => m[1]);
const files = readdirSync("public/images/characters");

const missing = used.filter((f) => !files.includes(f));
const unused = files.filter((f) => !used.includes(f));

console.log(`Catalogue : ${used.length} images référencées, ${files.length} fichiers dans le dossier.`);
if (missing.length) {
  console.log("\nMANQUANTS (référencés mais introuvables, vérifie l'orthographe/la casse) :");
  missing.forEach((f) => console.log("  - " + f));
}
if (unused.length) {
  console.log("\nNON UTILISÉS (présents dans le dossier mais pas dans le catalogue) :");
  unused.forEach((f) => console.log("  - " + f));
}
if (!missing.length && !unused.length) console.log("OK : tout correspond.");
process.exit(missing.length ? 1 : 0);
