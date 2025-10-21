import { theme } from '../theme';

// PUBLIC_INTERFACE
export default function Results({ state }) {
  /** Displays parsed results or user-friendly states based on state.status. */
  if (state.status === 'idle') {
    return (
      <div className="faint">
        Provide a URL above to preview basic metadata and links.
      </div>
    );
  }

  if (state.status === 'loading') {
    return (
      <div className="loading" aria-live="polite" aria-busy="true">
        <span className="spinner" />
        Fetching and parsing…
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="result-item" style={{ borderColor: theme.colors.error }}>
        <h3 style={{ color: theme.colors.error, marginTop: 0, marginBottom: 8 }}>Unable to scrape</h3>
        <div className="faint">
          {state.message || 'An unexpected error occurred.'}
        </div>
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
                <li key={`${l.href}-${idx}`} style={{ marginBottom: 6 }}>
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
