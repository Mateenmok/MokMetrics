import { useMemo, useState, type FormEvent } from 'react'

type LogStatus = 'idea' | 'building' | 'testing' | 'shipped'

type LogEntry = {
  id: string
  title: string
  note: string
  tag: string
  status: LogStatus
  createdAt: string
}

type PersonalLogProps = {
  onLock: () => void
}

const STORAGE_KEY = 'mokmetrics-personal-log-v1'

const STATUS_LABELS: Record<LogStatus, string> = {
  idea: 'Idea',
  building: 'Building',
  testing: 'Testing',
  shipped: 'Shipped',
}

const STARTER_ENTRIES: LogEntry[] = [
  {
    id: 'personal-log-live',
    title: 'The personal log is live',
    note: 'A separate corner for small projects, experiments, notes, and ideas worth returning to.',
    tag: 'system',
    status: 'shipped',
    createdAt: '2026-10-15T12:00:00.000Z',
  },
  {
    id: 'next-small-bet',
    title: 'Choose the next small bet',
    note: 'What can I make, test, or learn in one focused sitting?',
    tag: 'prompt',
    status: 'idea',
    createdAt: '2026-10-15T11:00:00.000Z',
  },
]

function loadEntries() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) as LogEntry[] : STARTER_ENTRIES
  } catch {
    return STARTER_ENTRIES
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function PersonalLog({ onLock }: PersonalLogProps) {
  const [entries, setEntries] = useState<LogEntry[]>(loadEntries)
  const [filter, setFilter] = useState<LogStatus | 'all'>('all')
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [tag, setTag] = useState('')
  const [status, setStatus] = useState<LogStatus>('idea')

  const visibleEntries = useMemo(
    () => entries.filter((entry) => filter === 'all' || entry.status === filter),
    [entries, filter],
  )

  function saveEntries(nextEntries: LogEntry[]) {
    setEntries(nextEntries)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries))
  }

  function addEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim() || !note.trim()) return

    const nextEntry: LogEntry = {
      id: window.crypto?.randomUUID?.() ?? `${Date.now()}`,
      title: title.trim(),
      note: note.trim(),
      tag: tag.trim() || 'uncategorized',
      status,
      createdAt: new Date().toISOString(),
    }

    saveEntries([nextEntry, ...entries])
    setTitle('')
    setNote('')
    setTag('')
    setStatus('idea')
  }

  return (
    <main className="personal-log">
      <header className="personal-log__header">
        <a className="personal-log__mark" href="#log" aria-label="Mateen's log home">
          <span>M</span>
          <span>LOG / 001</span>
        </a>
        <button className="personal-log__lock" type="button" onClick={onLock}>
          Lock log <span aria-hidden="true">↗</span>
        </button>
      </header>

      <section className="personal-log__hero" aria-labelledby="personal-log-title">
        <div>
          <p className="personal-log__kicker">Mateen's personal lab</p>
          <h1 id="personal-log-title">Notes from the<br />workbench.</h1>
        </div>
        <p className="personal-log__intro">
          A running record of side projects, half-formed ideas, useful failures,
          and experiments that might become something.
        </p>
      </section>

      <section className="personal-log__capture" aria-labelledby="capture-title">
        <div className="personal-log__section-label">
          <span>01</span>
          <h2 id="capture-title">Quick capture</h2>
        </div>

        <form className="log-capture" onSubmit={addEntry}>
          <label>
            <span>Project or experiment</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Give this idea a name"
              required
            />
          </label>
          <label className="log-capture__note">
            <span>What happened?</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="What did you try, learn, or want to remember?"
              rows={4}
              required
            />
          </label>
          <div className="log-capture__meta">
            <label>
              <span>Tag</span>
              <input
                value={tag}
                onChange={(event) => setTag(event.target.value)}
                placeholder="design, code, idea…"
              />
            </label>
            <label>
              <span>Status</span>
              <select value={status} onChange={(event) => setStatus(event.target.value as LogStatus)}>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
            <button type="submit" disabled={!title.trim() || !note.trim()}>
              Add to log <span aria-hidden="true">＋</span>
            </button>
          </div>
        </form>
      </section>

      <section className="personal-log__entries" id="log" aria-labelledby="entries-title">
        <div className="personal-log__section-label personal-log__section-label--entries">
          <span>02</span>
          <h2 id="entries-title">The log</h2>
          <p>{entries.length.toString().padStart(2, '0')} entries</p>
        </div>

        <div className="log-filters" aria-label="Filter log entries">
          {(['all', 'idea', 'building', 'testing', 'shipped'] as const).map((value) => (
            <button
              key={value}
              type="button"
              className={filter === value ? 'is-active' : ''}
              onClick={() => setFilter(value)}
            >
              {value === 'all' ? 'All' : STATUS_LABELS[value]}
            </button>
          ))}
        </div>

        <div className="log-entry-list">
          {visibleEntries.map((entry, index) => (
            <article className="log-entry" key={entry.id}>
              <div className="log-entry__number">{String(index + 1).padStart(2, '0')}</div>
              <div className="log-entry__body">
                <div className="log-entry__meta">
                  <span className={`log-entry__status log-entry__status--${entry.status}`}>
                    {STATUS_LABELS[entry.status]}
                  </span>
                  <span>#{entry.tag}</span>
                  <time dateTime={entry.createdAt}>{formatDate(entry.createdAt)}</time>
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.note}</p>
              </div>
              <button
                className="log-entry__delete"
                type="button"
                onClick={() => saveEntries(entries.filter((item) => item.id !== entry.id))}
                aria-label={`Delete ${entry.title}`}
                title="Delete entry"
              >
                ×
              </button>
            </article>
          ))}
          {!visibleEntries.length && (
            <p className="log-entry-list__empty">Nothing here yet. Capture the first one above.</p>
          )}
        </div>
      </section>

      <footer className="personal-log__footer">
        <p>Keep making things.</p>
        <span>Personal archive · stored in this browser</span>
      </footer>
    </main>
  )
}

export default PersonalLog
