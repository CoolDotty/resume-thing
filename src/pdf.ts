const encoder = new TextEncoder()

function escapePdfText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

export function buildPdfWithText(text: string): Blob {
  const escapedText = escapePdfText(text)
  const contentStream = `BT
/F1 24 Tf
72 720 Td
(${escapedText}) Tj
ET`
  const contentLength = encoder.encode(contentStream).length

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${contentLength} >>
stream
${contentStream}
endstream`,
  ]

  let pdf = '%PDF-1.4\n'
  const offsets: number[] = []

  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(encoder.encode(pdf).length)
    pdf += `${index + 1} 0 obj
${objects[index]}
endobj
`
  }

  const xrefOffset = encoder.encode(pdf).length
  pdf += `xref
0 ${objects.length + 1}
0000000000 65535 f 
`

  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, '0')} 00000 n 
`
  }

  pdf += `trailer
<< /Size ${objects.length + 1} /Root 1 0 R >>
startxref
${xrefOffset}
%%EOF`

  return new Blob([pdf], { type: 'application/pdf' })
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
