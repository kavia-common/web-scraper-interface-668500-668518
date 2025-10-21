import { useState, useEffect, useRef } from 'react';
import { theme } from '../theme';

const isValidUrl = (value) => {
  try {
    const u = new URL(value);
    return !!u.protocol && !!u.hostname;
  } catch {
    return false;
  }
};

// PUBLIC_INTERFACE
export default function UrlForm({ onSubmit, loading }) {
  /** URL entry form. Validates input and notifies parent via onSubmit(url). */
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a URL.');
      return;
    }
    if (!isValidUrl(url.trim())) {
      setError('Please enter a valid URL including protocol, e.g., https://example.com');
      return;
    }
    setError('');
    onSubmit?.(url.trim());
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Webpage URL input">
      <div className="input-row" role="group" aria-label="Enter URL to scrape">
        <input
          ref={inputRef}
          className="input"
          style={{ borderColor: error ? theme.colors.error : undefined }}
          type="url"
          name="url"
          placeholder="https://example.com"
          aria-label="URL"
          aria-invalid={!!error}
          aria-describedby={error ? 'url-error' : undefined}
          value={url}
          onChange={handleChange}
          disabled={loading}
          autoComplete="url"
          inputMode="url"
          required
        />
        <button
          type="submit"
          className="button"
          aria-label="Start scraping"
          disabled={loading}
        >
          {loading ? 'Scraping…' : 'Scrape'}
        </button>
      </div>
      <div className="helper" id="url-error" role={error ? 'alert' : undefined} style={{ color: error ? theme.colors.error : undefined }}>
        {error ? error : 'Enter a full URL including https://'}
      </div>
    </form>
  );
}
