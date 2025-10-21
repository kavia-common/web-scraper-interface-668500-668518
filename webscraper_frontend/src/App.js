import { useState } from 'react';
import './index.css';
import { theme } from './theme';
import UrlForm from './components/UrlForm';
import Results from './components/Results';
import { scrapeUrl } from './utils/scrape';

// PUBLIC_INTERFACE
export default function App() {
  /** Main app: centered layout with URL form and results panel. */
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

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

  return (
    <div className="container-center" role="main">
      <section className="card" aria-label="Webscraper">
        <header className="card-header">
          <h1 className="card-title" style={{ color: theme.colors.text }}>Ocean Web Scraper</h1>
          <div className="card-subtitle">Enter a URL to preview its title, description, and links</div>
        </header>
        <div className="card-body">
          <UrlForm onSubmit={handleSubmit} loading={status === 'loading'} />
          <div style={{ height: 8 }} />
          <Results state={{
            status,
            data: result,
            message: error
          }} />
        </div>
      </section>
    </div>
  );
}
