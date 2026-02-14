const encoder = new TextEncoder()

function escapePdfText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function buildPdfBodyWithText(text: string): { header: ArrayBuffer; body: string } {
  const escapedText = escapePdfText(text)
  // Text drawing operators for a single-line content stream.
  const contentStream = `BT
/F1 24 Tf
72 720 Td
(${escapedText}) Tj
ET`
  const wrappedContentStream = ['%%%', contentStream, '%%%'].join('\n')
  const contentLength = encoder.encode(wrappedContentStream).length

  // Core PDF objects, in order:
  // 1) Catalog -> entry point
  // 2) Pages   -> page tree root
  // 3) Page    -> single renderable page
  // 4) Font    -> built-in Helvetica font resource
  // 5) Contents-> stream with text drawing commands
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${contentLength} >>
stream
${wrappedContentStream}
endstream`,
  ]

  // PDF header declares version for readers, followed by a binary marker.
  // The marker is commonly used to signal binary content to tools/parsers.
  const headerBytes = new Uint8Array([
    0x25,
    0x50,
    0x44,
    0x46,
    0x2d,
    0x31,
    0x2e,
    0x34,
    0x0a, // %PDF-1.4\n
    0x25,
    0xe2,
    0xe3,
    0xcf,
    0xd3,
    0x0a, // %<binary bytes>\n
  ])
  const header = headerBytes.buffer.slice(
    headerBytes.byteOffset,
    headerBytes.byteOffset + headerBytes.byteLength
  )
  let pdf = ''
  let byteLength = headerBytes.length
  const offsets: number[] = []

  for (let index = 0; index < objects.length; index += 1) {
    // Record byte offset of each object start for xref.
    offsets.push(byteLength)
    // Write numbered indirect object blocks.
    const objectBlock = `${index + 1} 0 obj
${objects[index]}
endobj
`
    pdf += objectBlock
    byteLength += encoder.encode(objectBlock).length
  }

  // xref starts at this byte offset.
  const xrefOffset = byteLength
  // Cross-reference table maps object numbers -> byte offsets.
  const xrefBlock = `xref
0 ${objects.length + 1}
0000000000 65535 f 
`
  pdf += xrefBlock
  byteLength += encoder.encode(xrefBlock).length

  for (const offset of offsets) {
    const xrefEntry = `${String(offset).padStart(10, '0')} 00000 n 
`
    pdf += xrefEntry
    byteLength += encoder.encode(xrefEntry).length
  }

  // Trailer points readers to document root and total object count.
  const trailerBlock = `trailer
<< /Size ${objects.length + 1} /Root 1 0 R >>
startxref
${xrefOffset}
%%EOF`
  pdf += trailerBlock

  return { header, body: pdf }
}

export function buildPdfWithText(text: string): Blob {
  const { header, body } = buildPdfBodyWithText(text)
  return new Blob([header, body], { type: 'application/pdf' })
}

export function buildPdfLiteralWithText(text: string): string {
  const { body } = buildPdfBodyWithText(text)
  return `%PDF-1.4
%\\xE2\\xE3\\xCF\\xD3
${body}`
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.style.display = 'none'
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}
