import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = () => {
  const [isDark, setIsDark] = useState(false)

  const theme = {
    background: isDark ? '#1a1a1a' : '#fff',
    text: isDark ? '#e0e0e0' : '#333',
    border: isDark ? '#444' : '#ccc',
    toggleBg: isDark ? '#2a2a2a' : '#f5f5f5',
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.background,
      fontFamily: '"JetBrainsMono Nerd Font", "JetBrains Mono", monospace',
      transition: 'background-color 0.3s ease',
      position: 'relative',
      padding: '40px',
    }}>
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: theme.toggleBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          color: theme.text,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.backgroundColor = isDark ? '#333' : '#e8e8e8'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.backgroundColor = theme.toggleBg
        }}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      {/* Back Button */}
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: theme.text,
          textDecoration: 'none',
          fontSize: '1rem',
          transition: 'color 0.2s ease',
        }}
      >
        ← back
      </Link>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        marginTop: '80px',
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 500,
          marginBottom: '1.5rem',
          color: theme.text,
          transition: 'color 0.3s ease',
        }}>
        </h1>
        
        <div style={{
          color: theme.text,
          lineHeight: '1.8',
          transition: 'color 0.3s ease',
        }}>
          <p>Add content from github pages maybe?</p>
        </div>
      </div>
    </div>
  )
}

export default Blog
