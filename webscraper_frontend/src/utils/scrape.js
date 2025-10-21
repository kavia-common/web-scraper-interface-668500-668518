const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function parseHtml(htmlText, url) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const title = (doc.querySelector('title')?.textContent || '').trim();

    const metaDesc =
      doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
      doc.querySelector('meta[name="og:description"]')?.getAttribute('content') ||
      '';

    const anchors = Array.from(doc.querySelectorAll('a[href]')).slice(0, 10);
    const links = anchors.map((a) => {
      const href = a.getAttribute('href') || '';
      const text = (a.textContent || '').trim().replace(/\s+/g, ' ');
      return { href, text: text || href };
    });

    return {
      sourceUrl: url,
      title: title || '(No title found)',
      description: metaDesc || '(No meta description found)',
      links,
      scrapedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function mockData(url) {
  return {
    sourceUrl: url,
    title: 'Ocean Professional — Mocked Result',
    description:
      'This is mocked preview data shown when live fetch is blocked by CORS. Replace with backend integration later.',
    links: [
      { href: `${url}#about`, text: 'About' },
      { href: `${url}#features`, text: 'Features' },
      { href: `${url}#docs`, text: 'Documentation' },
      { href: `${url}#contact`, text: 'Contact' },
    ],
    scrapedAt: new Date().toISOString(),
    mocked: true,
  };
}

// PUBLIC_INTERFACE
export async function scrapeUrl(url) {
  /** Attempt to fetch HTML from the URL (CORS permitting). Parse with DOMParser.
   * On failure, fall back to mocked data to satisfy UX.
   */
  // Simulate network latency for UX consistency
  await delay(700);

  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const text = await response.text();
    const parsed = parseHtml(text, url);
    if (parsed) return parsed;
    return mockData(url);
  } catch (err) {
    // Likely CORS or network; return mocked data so UI still works.
    return mockData(url);
  }
}
