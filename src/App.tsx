import './App.css'
import { buildPdfWithText, downloadBlob } from './pdf'

function App() {
  const handleDownload = () => {
    const pdf = buildPdfWithText('Hello world')
    downloadBlob(pdf, 'hello-world.pdf')
  }

  return (
    <main className="app">
      <h1>Hello World PDF</h1>
      <button type="button" onClick={handleDownload}>
        Download Hello World PDF
      </button>
    </main>
  )
}

export default App
