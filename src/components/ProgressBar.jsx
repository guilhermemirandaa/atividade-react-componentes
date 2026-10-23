import './ProgressBar.css'


function ProgressBar({ value, label }) {
 
  const percent = Math.min(100, Math.max(0, value))

  return (
    <div className="progress">
      <div className="progress-header">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>

      
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={label}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar