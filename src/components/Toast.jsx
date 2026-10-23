import { useEffect } from 'react'
import './Toast.css'


const icones = {
  sucesso: '✔',
  erro: '✖',
  info: 'ℹ',
}

function Toast({ id, type, message, onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 3000)
    return () => clearTimeout(timer)
  }, [id, onClose])

  return (
    <div
      className={`toast toast-${type}`}
      role={type === 'erro' ? 'alert' : 'status'}
    >
      <span aria-hidden="true">{icones[type]}</span>
      <p>{message}</p>
      <button
        className="toast-close"
        onClick={() => onClose(id)}
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  )
}

export default Toast