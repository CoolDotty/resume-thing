import { useEffect, useMemo } from 'react'
import './App.css'
import { buildPdfLiteralWithText, buildPdfWithText, downloadBlob } from './pdf'

function App() {
  const pdf = useMemo(() => buildPdfWithText('Hello world'), [])
  const pdfLiteral = useMemo(() => buildPdfLiteralWithText('Hello world'), [])
  const pdfUrl = useMemo(() => URL.createObjectURL(pdf), [pdf])

  useEffect(() => {
    return () => URL.revokeObjectURL(pdfUrl)
  }, [pdfUrl])

  const handleDownload = () => {
    downloadBlob(pdf, 'hello-world.pdf')
  }

  return (
    <main className="app">
      <section className="controls">
        <h1>Hello World PDF</h1>
        <button type="button" onClick={handleDownload}>
          Download Hello World PDF
        </button>
      </section>
      <iframe className="preview" src={pdfUrl} title="PDF preview" />
      <pre className="literal">
        <code>{pdfLiteral}</code>
      </pre>
    </main>
  )
}

export default App
