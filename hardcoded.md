# Hardcoded OpenResume Renderer Customizations

These are renderer-level customizations currently not exposed through the pasted JSON resume input.

## Settings model exists but is not JSON-driven

The renderer supports these via `Settings`, but the app always passes `initialSettings`:

- `themeColor`
- `fontFamily`
- `fontSize`
- `documentSize`
- section visibility (`formToShow`)
- section headings (`formToHeading`)
- section order (`formsOrder`)
- per-section bullet toggles (`showBulletPoints`)

References:

- `src/openresume/lib/redux/settingsSlice.ts:2`
- `src/openresume/lib/redux/settingsSlice.ts:54`
- `src/openresume/lib/redux/settingsSlice.ts:55`
- `src/openresume/lib/redux/settingsSlice.ts:68`
- `src/openresume/lib/redux/settingsSlice.ts:81`
- `src/openresume/lib/redux/settingsSlice.ts:94`
- `src/App.tsx:656`

## Additional renderer hardcoding

- Hyphenation uses `initialSettings.fontFamily`, not JSON: `src/App.tsx:648`
- Render mode is app-driven (`combined` default), not JSON-configurable: `src/openresume/components/Resume/ResumePDF/index.tsx:41`
- Summary heading text is fixed to `"SUMMARY"`: `src/openresume/components/Resume/ResumePDF/ResumePDFSummary.tsx:21`
- Page presentation rules are fixed:
  - page number footer: `src/openresume/components/Resume/ResumePDF/index.tsx:23`
  - compact header height: `src/openresume/components/Resume/ResumePDF/index.tsx:79`
  - repeated compact header for page 2+: `src/openresume/components/Resume/ResumePDF/index.tsx:269`
- Date behavior is fixed:
  - `en-US` date formatting: `src/openresume/lib/redux/resumeFormatting.ts:16`
  - cover letter date uses current date (`en-US`): `src/openresume/components/Resume/ResumePDF/ResumePDFCoverLetter.tsx:26`
  - work `endDate` fallback is `"Present"`: `src/openresume/components/Resume/ResumePDF/ResumePDFWorkExperience.tsx:36`

## Fixed layout heuristics

- Profile contact items chunked into 4 per row: `src/openresume/components/Resume/ResumePDF/ResumePDFProfile.tsx:97`
- Skills and interests use fixed 3-column cards (`33.3333%`):
  - `src/openresume/components/Resume/ResumePDF/ResumePDFSkills.tsx:42`
  - `src/openresume/components/Resume/ResumePDF/ResumePDFInterests.tsx:38`
- Highlight splitting for pagination is fixed (2 highlights in core, except exactly 3 keeps 3): `src/openresume/components/Resume/ResumePDF/common/paginationAtoms.ts:15`

## Fixed typography and decoration

- Main name size is fixed at `20pt`: `src/openresume/components/Resume/ResumePDF/ResumePDFProfile.tsx:110`
- Compact header name size is fixed at `16pt`: `src/openresume/components/Resume/ResumePDF/index.tsx:288`
- Section heading letter spacing is fixed (`0.3pt`): `src/openresume/components/Resume/ResumePDF/common/index.tsx:29`
- Bullet glyph is fixed to `•`: `src/openresume/components/Resume/ResumePDF/common/index.tsx:123`

## Cover letter fixed behavior

- Bullet lists inside cover letter body always show bullet points: `src/openresume/components/Resume/ResumePDF/ResumePDFCoverLetter.tsx:66`
- Signature image size is fixed (`120pt x 45pt`): `src/openresume/components/Resume/ResumePDF/ResumePDFCoverLetter.tsx:76`

## Document metadata

- PDF producer is hardcoded as `"OpenResume"`: `src/openresume/components/Resume/ResumePDF/index.tsx:184`

## Parsed but unused by renderer

- `meta` is normalized from JSON, but not rendered in PDF output: `src/App.tsx:620`
