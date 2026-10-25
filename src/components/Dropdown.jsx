import { useState, useRef, useEffect } from 'react'
import './Dropdown.css'

function Dropdown({ label, options, onSelect }) {
  const [aberto, setAberto] = useState(false)
  const [selecionado, setSelecionado] = useState(options[0])
  const ref = useRef(null)

  useEffect(() => {
    function fecharAoClicarFora(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setAberto(false)
      }
    }
    document.addEventListener('mousedown', fecharAoClicarFora)
    return () => document.removeEventListener('mousedown', fecharAoClicarFora)
  }, [])

  function escolher(opcao) {
    setSelecionado(opcao)
    setAberto(false)
    onSelect(opcao)
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') setAberto(false)
  }

  return (
    <div className="dropdown" ref={ref} onKeyDown={handleKeyDown}>
      <span id="dropdown-label" className="dropdown-label">{label}</span>
      <button
        className="dropdown-button"
        aria-expanded={aberto}
        aria-controls="dropdown-lista"
        aria-describedby="dropdown-label"
        onClick={() => setAberto(!aberto)}
      >
        {selecionado}
        <span aria-hidden="true">{aberto ? '▲' : '▼'}</span>
      </button>

      {aberto && (
        <ul id="dropdown-lista" className="dropdown-list" aria-label={label}>
          {options.map((opcao) => (
            <li key={opcao}>
              <button
                className={`dropdown-option ${opcao === selecionado ? 'selecionada' : ''}`}
                aria-current={opcao === selecionado ? 'true' : undefined}
                onClick={() => escolher(opcao)}
              >
                {opcao}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown