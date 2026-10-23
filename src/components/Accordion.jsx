import { useState } from 'react'
import './Accordion.css'

function Accordion({ items }) {
  const [aberto, setAberto] = useState(null)

  function alternar(index) {
    setAberto(aberto === index ? null : index)
  }

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const estaAberto = aberto === index

        return (
          <div key={item.titulo} className="accordion-item">
            <h3 className="accordion-heading">
              <button
                id={`acc-botao-${index}`}
                className="accordion-button"
                aria-expanded={estaAberto}
                aria-controls={`acc-painel-${index}`}
                onClick={() => alternar(index)}
              >
                {item.titulo}
                <span aria-hidden="true">{estaAberto ? '−' : '+'}</span>
              </button>
            </h3>

            <div
              id={`acc-painel-${index}`}
              role="region"
              aria-labelledby={`acc-botao-${index}`}
              aria-hidden={!estaAberto}
              className={`accordion-panel ${estaAberto ? 'aberto' : ''}`}
            >
              <div className="accordion-conteudo">{item.conteudo}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion