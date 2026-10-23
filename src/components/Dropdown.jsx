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
      <span className="dropdown-label">{label}</span>
      <button
        className="dropdown-button"
        aria-haspopup="listbox"
        aria-expanded={aberto}
        onClick={() => setAberto(!aberto)}
      >
        {selecionado}
        <span aria-hidden="true">{aberto ? '▲' : '▼'}</span>
      </button>

      {aberto && (
        <ul className="dropdown-list" role="listbox" aria-label={label}>
          {options.map((opcao) => (
            <li key={opcao} role="option" aria-selected={opcao === selecionado}>
              <button
                className={`dropdown-option ${opcao === selecionado ? 'selecionada' : ''}`}
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