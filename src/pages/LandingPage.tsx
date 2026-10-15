import { useState, type FormEvent } from 'react'

type LandingPageProps = {
  onSubmitCode: (code: string) => boolean
}

function LandingPage({ onSubmitCode }: LandingPageProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (onSubmitCode(code)) return

    setError('That access code is not recognized.')
  }

  return (
    <main className="access-page">
      <section className="access-card" aria-labelledby="access-title">
        <p className="access-brand">MokMetrics</p>
        <h1 id="access-title">Enter access code</h1>
        <p className="access-intro">Enter your code to open the appropriate analysis page.</p>

        <form className="access-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="access-code">Access code</label>
          <div className="access-form__controls">
            <input
              id="access-code"
              type="text"
              value={code}
              onChange={(event) => {
                setCode(event.target.value)
                if (error) setError('')
              }}
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? 'access-error' : undefined}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              autoFocus
            />
            <button type="submit" disabled={!code.trim()}>
              Continue
            </button>
          </div>
          {error && <p className="access-error" id="access-error" role="alert">{error}</p>}
        </form>
      </section>
    </main>
  )
}

export default LandingPage
