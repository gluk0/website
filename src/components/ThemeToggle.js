import React from 'react'
import './ThemeToggle.css'

const ThemeToggle = ({ isDark, onToggle, theme }) => {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      style={{
        background: theme.toggleBg,
        borderColor: theme.border,
        color: theme.text,
      }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle
