# Webscraper Frontend (Ocean Professional)

A simple React UI where users can input a URL and view scraped data (title, description, links). Uses a mock scraping approach in the frontend and an Ocean Professional theme.

## Getting Started

In the project directory:

- `npm install` (first run)
- `npm start`

App runs on http://localhost:3000 (or the container-mapped port).

## How it works

- Client-side attempts `fetch(<URL>)` to get HTML. Many sites block this due to CORS.
- If CORS or network fails, the app falls back to mocked sample data so users always see a result.
- When fetch succeeds, it parses:
  - `<title>`
  - `<meta name="description">` or `og:description`
  - First 10 anchor links (`<a href>`)

All logic is in `src/utils/scrape.js`.

## Project Structure

- `src/App.js` — Main app. Handles states: idle, loading, success, error.
- `src/components/UrlForm.jsx` — Accessible URL input and submit.
- `src/components/Results.jsx` — Displays results and states.
- `src/utils/scrape.js` — Scrape (attempt + mock fallback).
- `src/theme.js` — Theme tokens (colors, spacing, radius, shadows).
- `src/index.css` — Global styles, gradient background.

## Notes

- No backend required.
- This UI is accessible, keyboard-friendly, and uses subtle transitions and soft shadows.
- Replace the mock fallback with a backend endpoint in the future for reliable scraping.
