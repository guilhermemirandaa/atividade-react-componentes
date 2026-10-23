import { useState } from 'react'
import './Tabs.css'

function Tabs({ tabs }) {
  const [ativa, setAtiva] = useState(0)

  function handleKeyDown(e) {
    if (e.key === 'ArrowRight') {
      setAtiva((ativa + 1) % tabs.length)
    }
    if (e.key === 'ArrowLeft') {
      setAtiva((ativa - 1 + tabs.length) % tabs.length)
    }
  }

  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist" onKeyDown={handleKeyDown}>
        {tabs.map((tab, index) => (
          <button
            key={tab.titulo}
            id={`tab-${index}`}
            role="tab"
            aria-selected={ativa === index}
            aria-controls={`painel-${index}`}
            tabIndex={ativa === index ? 0 : -1}
            className={`tabs-button ${ativa === index ? 'ativa' : ''}`}
            onClick={() => setAtiva(index)}
          >
            {tab.titulo}
          </button>
        ))}
      </div>

      <div
        id={`painel-${ativa}`}
        role="tabpanel"
        aria-labelledby={`tab-${ativa}`}
        className="tabs-panel"
      >
        {tabs[ativa].conteudo}
      </div>
    </div>
  )
}

export default Tabs