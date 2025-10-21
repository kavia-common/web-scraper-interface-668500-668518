import { useEffect, useState } from 'react';
import './index.css';
import { theme, getInitialTheme, ThemeStorage } from './theme';
import UrlForm from './components/UrlForm';
import Results from './components/Results';
import { scrapeUrl } from './utils/scrape';

// PUBLIC_INTERFACE
export default function App() {
  /** Main app: centered layout with URL form and results panel. Includes theme toggle with persistence. */
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [mode, setMode] = useState(getInitialTheme()); // 'light' | 'dark'

  useEffect(() => {
    // Apply the selected theme to :root
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);
    ThemeStorage.set(mode);
  }, [mode]);

  const handleSubmit = async (url) => {
    setStatus('loading');
    setError('');
    setResult(null);
    try {
      const data = await scrapeUrl(url);
      setResult(data);
      setStatus('success');
    } catch (e) {
      setError('Failed to fetch or parse the URL. Please try again.');
      setStatus('error');
    }
  };

  const toggleTheme = () => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="container-center" role="main">
      <section className="card" aria-label="Webscraper">
        <header className="card-header">
          <div className="header-row">
            <div>
              <h1 className="card-title" style={{ color: theme.colors.text }}>Ocean Web Scraper</h1>
              <div className="card-subtitle">Enter a URL to preview its title, description, and links</div>
            </div>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              title="Toggle light/dark theme"
            >
              <span aria-hidden="true">{mode === 'dark' ? '🌙' : '🌞'}</span>
              <span style={{ fontSize: 13 }}>{mode === 'dark' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </header>
        <div className="card-body">
          <UrlForm onSubmit={handleSubmit} loading={status === 'loading'} />
          <div style={{ height: 8 }} />
          <Results state={{
            status,
            data: result,
            message: error,
            onRetry: () => setStatus('idle'),
          }} />
        </div>
      </section>
    </div>
  );
}
