import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const raw = await readFile(join(root, "styles.tsv"), "utf8");
const styles = raw.trim().split("\n").map((line) => {
  const [id, name, slug, category, visualDNA] = line.split("\t");
  return { id, name, slug, category, visualDNA };
});

const locked = [
  "Okie remains a compact full-body green artichoke built from overlapping pointed leaves.",
  "Okie keeps large cream oval eyes, black pupils, arched brows, and a wide open smile with a red tongue.",
  "Okie keeps black rubber-hose arms and legs, cream four-finger gloves, and oversized cream shoes with black soles.",
  "A heavy polished gold Cuban-link chain carries an oversized rectangular pendant reading OKIE.",
  "The raised left-side hand forms a readable OK sign; the opposite hand remains a playful closed fist.",
  "The pose keeps one shoe lifted forward and the other planted, giving Okie a jaunty walking stance.",
  "The speech bubble reads OKIE DOKIE exactly.",
  "The cream speech bubble uses a heavy black outline and remains visually connected to Okie.",
  "The composition retains a thick white die-cut sticker border and clean outer silhouette.",
  "The artichoke identity survives every abstraction and rendering method."
];

const forbidden = [
  "Do not turn Okie into a human wearing an artichoke costume.",
  "Do not substitute another vegetable.",
  "Do not misspell OKIE or OKIE DOKIE.",
  "Do not remove the chain, pendant, OK sign, or speech bubble.",
  "Do not add extra arms, hands, fingers, faces, chains, or pendants.",
  "Do not copy an existing protected character, logo, signature, or source composition.",
  "Do not let the style make Okie unreadable at sticker size."
];

const list = (items) => items.map((item) => "- " + item).join("\n");
const put = async (path, body) => {
  const target = join(root, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, body.trim() + "\n", "utf8");
};

const categoryDirection = {
  "Pop art and graphic movements": "Treat the master as a graphic print, poster, or mural with bold negative space.",
  "Comics, pulp, and print": "Treat the master as an illustrated cover with Okie readable at thumbnail size.",
  "Western animation": "Treat the master as two-dimensional animation key art in a simple supporting scene.",
  "Anime and manga": "Use dynamic full-body key art, cinematic depth, and a clearly readable hand gesture.",
  "Film and television": "Use character-first cinematic key art with recognizable lighting and environmental storytelling.",
  "Advertising and campaigns": "Build one immediate campaign idea with polished production and little visual clutter.",
  "Music, fashion, and youth culture": "Use confident character posing with period-specific framing, type, and texture.",
  "Video games and digital culture": "Use a readable game-character silhouette with era-correct rendering limits.",
  "Internet-era and current graphics": "Build a mobile-readable 1:1 campaign master with a central character."
};

await rm(join(root, "styles"), { recursive: true, force: true });

const indexRows = styles.map((s) =>
  "| " + s.id + " | [" + s.name + "](styles/" + s.id + "-" + s.slug + "/) | " + s.category + " |"
).join("\n");

await put("README.md", `
# The Okie Campaign

A production system for reimagining one canonical character across 100 recognizable visual languages without losing the character.

## Character lock

${list(locked)}

Ryan's approved 1536×1536 source image is bundled at \`character/reference/okie-canonical.jpg\`. That image outranks every written interpretation.

## Repository map

- \`character/\`: canonical reference and character bible
- \`styles/\`: 100 numbered production packages
- \`templates/\`: reusable files for future styles
- \`schemas/\`: machine-readable metadata contract
- \`scripts/\`: deterministic builder and validator
- \`docs/\`: workflow, naming, and rights guidance

## Style index

| ID | Style | Category |
|---:|---|---|
${indexRows}

## Fast workflow

1. Add the approved canonical image.
2. Choose a numbered style folder.
3. Read its \`AGENTS.md\`, \`STYLE.md\`, and \`PROMPT.md\`.
4. Generate into \`assets/generated/\`.
5. Run the folder's \`QA.md\` checklist.
6. Export approved work into \`assets/exports/\`.

Run \`node scripts/validate.mjs\` after structural edits.
`);

await put("AGENTS.md", `
# AGENTS.md

## Mission

Create a coherent campaign in which one canonical Okie can enter 100 visual languages without losing identity, gesture, wording, or sticker usability.

## Authority order

1. \`character/reference/okie-canonical.jpg\`
2. \`character/CHARACTER-BIBLE.md\`
3. The selected style folder's \`AGENTS.md\` and \`STYLE.md\`
4. The selected style folder's \`PROMPT.md\`

## Character rules

${list(locked)}

## Production rules

- Work in one numbered style folder at a time.
- Preserve the canonical silhouette before intensifying style traits.
- Treat names as internal catalog labels. Build prompts from visual traits.
- Never trace source artwork or reproduce logos, signatures, trade dress, or existing characters.
- Create one clean master before format variants.
- Save drafts in \`assets/generated/\` and approved files in \`assets/exports/\`.
- Record generation details in \`MANIFEST.md\`.
- Reject any image that fails a character rule.

## File naming

\`okie-{style-id}-{style-slug}-{variant}-{aspect}-{revision}.{ext}\`
`);

await put("character/CHARACTER-BIBLE.md", `
# Okie Character Bible

## Canonical identity

Okie is a cheerful anthropomorphic artichoke built around “Okie Dokie Artichokie.” He reads as cute, confident, mischievous, and immediately friendly.

## Locked visual markers

${list(locked)}

## Expression

- Wide, open, self-assured smile with a visible red tongue
- Large cream oval eyes with black pupils and arched brows
- Kawaii appeal without becoming infant-like
- A pose that feels like Okie is personally delivering the phrase

## Anatomy and pose

- Dense crown and body made from overlapping pointed artichoke leaves
- Black rubber-hose arms and legs
- Cream four-finger gloves with black contour work
- Oversized cream shoes with black soles
- Left-side hand raised in the OK gesture
- Opposite hand held as a playful fist
- One foot lifted forward and the other planted

## Jewelry and copy

- Heavy polished gold Cuban-link chain
- Oversized rectangular gold pendant reading \`OKIE\`
- Cream oval speech bubble with heavy black outline
- Bold red speech-bubble lettering reading \`OKIE DOKIE\`

## Canonical copy

- Pendant: \`OKIE\`
- Speech bubble: \`OKIE DOKIE\`

## Source image

The approved image is bundled at \`reference/okie-canonical.jpg\`. It is a 1536×1536 JPEG. Do not silently replace it with a new interpretation.
`);

await put("character/reference/README.md", `
# Canonical reference

The approved source image is \`okie-canonical.jpg\`, a 1536×1536 JPEG supplied by Ryan. Its SHA-256 digest is \`3cfcb1dec1e3b3bfe5d33c98c88cd38f6a0cf41f1431c91ca9eccd86db4eefae\`.
`);

await put("docs/WORKFLOW.md", `
# Campaign workflow

1. Lock the canonical reference.
2. Select one numbered style.
3. Generate a 1:1 master from that folder's prompt.
4. Repair character-lock failures before variants.
5. Run local QA.
6. Record retained work in the manifest.
7. Export transparent sticker, 4:5, 9:16, and 16:9 variants.
8. Mark the style approved after human review.
`);

await put("docs/NAMING.md", `
# Naming convention

Use \`okie-{style-id}-{style-slug}-{variant}-{aspect}-{revision}.{ext}\`.

Variants: \`hero\`, \`sticker\`, \`social\`, \`story\`, \`banner\`, \`print\`.

Aspects: \`1x1\`, \`4x5\`, \`9x16\`, \`16x9\`, \`custom\`.

Revisions use two digits: \`r01\`, \`r02\`, \`r03\`.
`);

await put("docs/RIGHTS-GUIDANCE.md", `
# Rights guidance

Style names are internal catalog labels. Production prompts rely on visual traits rather than copying an artist's signature, an existing character, a logo, campaign copy, trade dress, or a source composition. Commercial releases need a separate rights and resemblance review. Keep provenance notes for every research image.
`);

await put("templates/STYLE.template.md", `
# Style specification

## Catalog label

## Visual DNA

## Medium and composition

## Color and surface

## Typography

## Character invariants

## Forbidden changes
`);

await put("templates/MANIFEST.template.md", `
# Asset manifest

| Date | File | Model/tool | Prompt revision | Aspect | Seed/job ID | Result | Notes |
|---|---|---|---|---|---|---|---|
`);

await put("schemas/style.schema.json", JSON.stringify({
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Okie Style Package",
  type: "object",
  required: ["id", "slug", "name", "category", "visual_dna", "required_text", "status"],
  properties: {
    id: { type: "string", pattern: "^[0-9]{3}$" },
    slug: { type: "string", pattern: "^[a-z0-9-]+$" },
    name: { type: "string" },
    category: { type: "string" },
    visual_dna: { type: "string", minLength: 20 },
    required_text: {
      type: "object",
      required: ["pendant", "speech_bubble"],
      properties: {
        pendant: { const: "OKIE" },
        speech_bubble: { const: "OKIE DOKIE" }
      }
    },
    status: { enum: ["not_started", "draft", "review", "approved"] }
  }
}, null, 2));

await put(".gitignore", `
.DS_Store
Thumbs.db
node_modules/
*.tmp
`);

for (const s of styles) {
  const base = "styles/" + s.id + "-" + s.slug;
  const direction = categoryDirection[s.category];

  await put(base + "/README.md", `
# ${s.id}: ${s.name}

**Category:** ${s.category}

**Visual DNA:** ${s.visualDNA}

## Package

- \`AGENTS.md\`: local production direction
- \`STYLE.md\`: visual recipe
- \`PROMPT.md\`: generation and repair prompts
- \`QA.md\`: acceptance checklist
- \`MANIFEST.md\`: output log
- \`style.json\`: machine-readable metadata
- \`assets/reference/\`: approved research references
- \`assets/generated/\`: raw generations
- \`assets/exports/\`: approved campaign assets
`);

  await put(base + "/AGENTS.md", `
# Local agent direction: ${s.name}

Read the root \`AGENTS.md\` and \`character/CHARACTER-BIBLE.md\` first.

## Objective

Translate canonical Okie into style ${s.id} using this visual system:

> ${s.visualDNA}

## Priority

1. Preserve Okie's identity and locked props.
2. Make the visual language recognizable through traits, not copied source material.
3. Keep hand sign, pendant copy, and speech-bubble copy readable.
4. Produce a strong die-cut sticker master.

If a style trait conflicts with a character invariant, preserve the invariant and express the style elsewhere.
`);

  await put(base + "/STYLE.md", `
# Style specification

## Catalog label

${s.name}

## Visual DNA

${s.visualDNA}

## Medium and composition

${direction} Preserve a clear speech-bubble zone and readable OK hand sign.

## Color and surface

Use the palette, texture, and rendering behavior named in the visual DNA. Retain artichoke greens and metallic gold unless a constrained palette defines the treatment. In a constrained treatment, preserve them through value hierarchy or one selective accent.

## Typography

Use original, period-compatible lettering without copying a logo or signature. The speech bubble reads \`OKIE DOKIE\`; the pendant reads \`OKIE\`.

## Character invariants

${list(locked)}

## Forbidden changes

${list(forbidden)}
`);

  await put(base + "/PROMPT.md", `
# Generation prompts

## Master prompt

Use the supplied canonical Okie image as the controlling identity and composition reference. Re-render that same character through this visual system: ${s.visualDNA} ${direction} Preserve the compact full-body artichoke made from overlapping pointed green leaves; large cream oval eyes and wide open smile; black rubber-hose limbs; cream four-finger gloves and oversized shoes; heavy gold Cuban-link chain and rectangular \`OKIE\` pendant; raised left-side hand forming the OK sign; opposite playful fist; one lifted shoe; and the upper-right cream speech bubble saying \`OKIE DOKIE\` exactly in bold red letters. Preserve a thick white die-cut border and clean outer silhouette. Change the rendering language, palette behavior, texture, lighting, and environmental treatment, not Okie's identity, pose, props, anatomy, or copy. Do not reproduce an unrelated existing character, logo, signature, protected campaign copy, or source composition.

## Negative constraints

${list(forbidden)}

## Repair prompt

Keep the composition and style treatment. Repair only failed canonical details: restore the compact layered artichoke silhouette; large cream eyes; wide open smile; black rubber-hose limbs; cream gloves and shoes; heavy gold chain; rectangular \`OKIE\` pendant; raised left-side OK sign; opposite fist; lifted shoe; and upper-right \`OKIE DOKIE\` speech bubble. Remove extra limbs, fingers, faces, chains, pendants, or text. Preserve every correct area.

## Transparent sticker variant

Use the approved master. Remove the environmental background, preserve interior negative spaces, add a clean white die-cut border, and export on transparency. Do not crop leaves, hand, chain, pendant, or speech bubble.

## First outputs

- 1:1 campaign master
- Transparent die-cut sticker
- 4:5 social post
- 9:16 story or short-form cover
- 16:9 banner
`);

  await put(base + "/QA.md", `
# QA checklist: ${s.name}

## Character lock

- [ ] The character is unmistakably an artichoke.
- [ ] Layered green leaves remain visible.
- [ ] The face feels friendly, kawaii, and confident.
- [ ] The gold chain is visible.
- [ ] The pendant reads \`OKIE\` exactly.
- [ ] One hand forms a readable OK sign.
- [ ] The speech bubble reads \`OKIE DOKIE\` exactly.
- [ ] No extra anatomy, chains, pendants, or text appear.

## Style

- [ ] The image expresses: ${s.visualDNA}
- [ ] Recognition comes from visual traits rather than copied source material.
- [ ] Rendering and background belong to the same visual language.
- [ ] Okie remains readable at thumbnail size.

## Production

- [ ] The master has a clean die-cut silhouette.
- [ ] Nothing important is cropped.
- [ ] Text remains legible at intended size.
- [ ] The output name follows repository rules.
- [ ] Prompt, model, date, aspect, and revision appear in \`MANIFEST.md\`.
`);

  await put(base + "/MANIFEST.md", `
# Asset manifest

| Field | Value |
|---|---|
| Style ID | ${s.id} |
| Style | ${s.name} |
| Status | Not started |
| Canonical reference | \`../../../character/reference/okie-canonical.jpg\` |
| Approved master |  |

## Generation log

| Date | File | Model/tool | Prompt revision | Aspect | Seed/job ID | Result | Notes |
|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |

## Approval

- Reviewer:
- Approval date:
- Approved exports:
`);

  await put(base + "/style.json", JSON.stringify({
    id: s.id,
    slug: s.slug,
    name: s.name,
    category: s.category,
    visual_dna: s.visualDNA,
    canonical_reference: "../../../character/reference/okie-canonical.jpg",
    required_text: { pendant: "OKIE", speech_bubble: "OKIE DOKIE" },
    status: "not_started"
  }, null, 2));

  await put(base + "/assets/reference/README.md", `
# Reference assets

Store approved visual research and provenance notes here. The canonical Okie image belongs in \`character/reference/\`.
`);
  await put(base + "/assets/generated/README.md", `
# Generated assets

Store raw generations and repair iterations here. Use revisioned filenames and log retained work in \`../../MANIFEST.md\`.
`);
  await put(base + "/assets/exports/README.md", `
# Approved exports

Store approved, color-checked campaign files here. Include transparent PNG and any print-ready formats.
`);
}

console.log("Built " + styles.length + " style packages.");
