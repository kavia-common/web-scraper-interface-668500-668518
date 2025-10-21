import { theme } from '../theme';

// PUBLIC_INTERFACE
export default function Results({ state }) {
  /** Displays parsed results or user-friendly states based on state.status. */
  if (state.status === 'idle') {
    return (
      <div className="empty-state" role="status" aria-live="polite">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="empty-icon" aria-hidden="true">🧭</span>
          <div>
            <div style={{ fontWeight: 600 }}>Start by entering a URL</div>
            <div className="faint">We’ll fetch the title, description, and first few links.</div>
          </div>
        </div>
      </div>
    );
  }

  if (state.status === 'loading') {
    return (
      <div className="results" aria-live="polite" aria-busy="true">
        <div className="result-item">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-line" style={{ width: '90%' }} />
          <div className="skeleton skeleton-line" style={{ width: '70%' }} />
          <div style={{ height: 6 }} />
          <div className="skeleton skeleton-chip" />
        </div>
        <div className="result-item">
          <div className="skeleton skeleton-title" style={{ width: '40%' }} />
          <div className="skeleton skeleton-line" style={{ width: '96%' }} />
          <div className="skeleton skeleton-line" style={{ width: '88%' }} />
          <div className="skeleton skeleton-line" style={{ width: '82%' }} />
          <div className="skeleton skeleton-line" style={{ width: '60%' }} />
        </div>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="error-state" role="alert">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="error-icon" aria-hidden="true">⚠️</span>
          <div>
            <div style={{ color: theme.colors.error, fontWeight: 700, marginBottom: 4 }}>Unable to scrape</div>
            <div className="faint">
              {state.message || 'An unexpected error occurred.'}
            </div>
          </div>
        </div>
        {typeof state.onRetry === 'function' && (
          <button className="retry" type="button" onClick={state.onRetry} aria-label="Retry">
            Try again
          </button>
        )}
      </div>
    );
  }

  if (state.status === 'success' && state.data) {
    const { title, description, links, sourceUrl, mocked } = state.data;
    return (
      <div className="results" aria-live="polite">
        <div className="result-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <h3 style={{ margin: 0, lineHeight: 1.2 }}>{title}</h3>
            {mocked && <span className="badge" title="Displayed because CORS blocked live fetch">Mocked</span>}
          </div>
          <div className="faint" style={{ marginBottom: 6 }}>{description}</div>
          <a href={sourceUrl} target="_blank" rel="noreferrer">Open source page ↗</a>
        </div>
        <div className="result-item">
          <h3>Links found (up to 10)</h3>
          {links?.length ? (
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {links.map((l, idx) => (
                <li
                  key={`${l.href}-${idx}`}
                  style={{
                    marginBottom: 6,
                    animation: 'fadeSlideIn 280ms ease forwards',
                    opacity: 0,
                    transform: 'translateY(6px)',
                    animationDelay: `${idx * 40}ms`
                  }}
                >
                  <a href={l.href} target="_blank" rel="noreferrer">{l.text}</a>
                  <div className="faint" style={{ fontSize: 12, marginTop: 2 }}>{l.href}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="faint">No links detected on the page.</div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
