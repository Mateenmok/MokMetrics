type MokMetricsLogoProps = {
  className?: string
}

function MokMetricsLogo({ className = '' }: MokMetricsLogoProps) {
  return (
    <div className={`mokmetrics-logo ${className}`.trim()} role="img" aria-label="MokMetrics">
      <span>M</span>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="44" fill="#fffdf7" stroke="currentColor" strokeWidth="5" />
        <path d="M22 18C37 29 42 41 42 50C42 59 37 71 22 82" fill="none" stroke="#c83b33" strokeWidth="4" strokeLinecap="round" />
        <path d="M78 18C63 29 58 41 58 50C58 59 63 71 78 82" fill="none" stroke="#c83b33" strokeWidth="4" strokeLinecap="round" />
        <path d="M26 28L34 32M30 37L38 40M31 47L40 48M31 57L40 55M28 67L37 63M74 28L66 32M70 37L62 40M69 47L60 48M69 57L60 55M72 67L63 63" fill="none" stroke="#c83b33" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span>KMETRICS</span>
    </div>
  )
}

export default MokMetricsLogo
