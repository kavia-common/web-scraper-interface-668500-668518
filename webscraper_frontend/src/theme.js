export const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    success: '#06b6d4',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
  },
  darkColors: {
    primary: '#3b82f6',
    secondary: '#94a3b8',
    success: '#06b6d4',
    error: '#EF4444',
    background: '#0f172a', // deep slate
    surface: '#111827',    // near-surface slate
    text: '#e5e7eb',
  },
  spacing: {
    xs: '6px',
    sm: '10px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radii: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    round: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.06)',
    md: '0 6px 20px rgba(0,0,0,0.08)',
    lg: '0 14px 40px rgba(0,0,0,0.10)',
    inset: 'inset 0 1px 0 rgba(255,255,255,0.5)',
  },
  transitions: {
    base: 'all 200ms ease',
    slow: 'all 320ms ease',
  },
};

// PUBLIC_INTERFACE
export const ThemeStorage = {
  /** Storage key for theme preference in localStorage. */
  key: 'ocean_theme',
  // PUBLIC_INTERFACE
  get() {
    try {
      return localStorage.getItem(this.key);
    } catch {
      return null;
    }
  },
  // PUBLIC_INTERFACE
  set(value) {
    try {
      localStorage.setItem(this.key, value);
    } catch {
      /* ignore */
    }
  },
};

// PUBLIC_INTERFACE
export function getInitialTheme() {
  /** Returns 'light' | 'dark' honoring localStorage and prefers-color-scheme. */
  const saved = ThemeStorage.get();
  if (saved === 'light' || saved === 'dark') return saved;
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}
