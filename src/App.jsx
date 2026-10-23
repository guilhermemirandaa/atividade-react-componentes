import { useState, useEffect } from 'react'
import ProgressBar from './components/ProgressBar'
import './App.css'

function App() {

  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  
  useEffect(() => {
    if (!uploading) return

    const timer = setInterval(() => {
      setProgress((atual) => {
        if (atual >= 100) {
          setUploading(false)
          return 100
        }
        return atual + 10
      })
    }, 300)

   
    return () => clearInterval(timer)
  }, [uploading])

  function iniciarUpload() {
    setProgress(0)
    setUploading(true)
  }

  return (
    <main>
      <h1>Loja Virtual</h1>

      <section>
        <h2>Enviar foto do produto</h2>
        <ProgressBar value={progress} label="Upload da imagem" />
        <button onClick={iniciarUpload} disabled={uploading}>
          {uploading ? 'Enviando...' : 'Simular upload'}
        </button>
      </section>
    </main>
  )
}

export default App