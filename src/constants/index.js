/**
 * Application constants and configuration
 */


export const API_ENDPOINTS = {
  HEALTH: '/health',
  // Add more API endpoints as needed
}

export const ENV_CONFIG = {
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
}

export const ANIMATION_TIMINGS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  TYPEWRITER_CHAR_DELAY: 15,
  TYPEWRITER_LINE_DELAY: 15,
}

export const COLORS = {
  PRIMARY: '#2f363d',
  BACKGROUND: '#fff',
  BACKGROUND_ALT: '#fafafa',
  ACCENT: '#007bff',
  ERROR: '#dc3545',
  SUCCESS: '#28a745',
  WARNING: '#ffc107',
  INFO: '#17a2b8',
}

// Typography
export const TYPOGRAPHY = {
  FONT_FAMILY: 'JetBrains Mono, monospace',
  FONT_SIZE: {
    SMALL: '0.875rem',
    BASE: '1rem',
    LARGE: '1.125rem',
    XLARGE: '1.25rem',
    XXLARGE: '1.5rem',
  },
}

// Breakpoints for responsive design
export const BREAKPOINTS = {
  MOBILE: 576,
  TABLET: 768,
  DESKTOP: 992,
  LARGE_DESKTOP: 1200,
}

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'portfolio_theme',
  USER_PREFERENCES: 'portfolio_preferences',
  VISITED_PAGES: 'portfolio_visited_pages',
}

// Social links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/gluk0',
  LINKEDIN: 'https://linkedin.com/in/rich-clarke',
  EMAIL: 'mailto:me@gluk0.sh',
  BLOG: 'https://gluk0.sh/blog',
}

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  URL: /^https?:\/\/.+/,
}
