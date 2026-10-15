import { useState, type FormEvent } from 'react'
import MokMetricsLogo from '../components/MokMetricsLogo'

type LandingPageProps = {
  onSubmitCode: (code: string) => boolean
}

const LEFT_CARDS = ['584cb.jpg', '0de70.jpg', '13905.jpg', 'd4d2d.jpg', 'b9a8b.jpg']
const RIGHT_CARDS = ['bfc0d.jpg', 'a1813.jpg', '93d27.jpg', '93431.jpg', '58313.jpg']

function CardRail({ side, cards }: { side: 'left' | 'right'; cards: string[] }) {
  return (
    <div className={`access-card-rail access-card-rail--${side}`} aria-hidden="true">
      {cards.map((card, index) => (
        <img
          key={card}
          className={`access-player-card access-player-card--${index + 1}`}
          src={`/access-cards/${card}`}
          alt=""
        />
      ))}
    </div>
  )
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
      <CardRail side="left" cards={LEFT_CARDS} />
      <CardRail side="right" cards={RIGHT_CARDS} />

      <section className="access-card" aria-labelledby="access-title">
        <p className="access-eyebrow">Baseball intelligence, decoded</p>
        <h1 id="access-title">
          <MokMetricsLogo />
        </h1>
        <p className="access-intro">A research workspace for understanding how lineup decisions shape team outcomes.</p>

        <form className="access-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="access-code">Enter your access code</label>
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
