import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [buttonStates, setButtonStates] = useState({
    home: { y: 0, bouncing: false },
    drawing: { y: 0, bouncing: false },
    blog: { y: 0, bouncing: false },
    homelab: { y: 0, bouncing: false },
    git: { y: 0, bouncing: false },
    contact: { y: 0, bouncing: false },
  })
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const buttons = ['home', 'drawing', 'blog', 'homelab', 'git', 'contact']
    
    const triggerBounce = (button) => {
      setButtonStates(prev => ({
        ...prev,
        [button]: { y: -15, bouncing: true }
      }))

      // Return to ground with bounce
      setTimeout(() => {
        setButtonStates(prev => ({
          ...prev,
          [button]: { y: 0, bouncing: false }
        }))
      }, 400)
    }

    const randomBounce = () => {
      const randomButton = buttons[Math.floor(Math.random() * buttons.length)]
      triggerBounce(randomButton)
    }

    // Start random bounces
    const interval = setInterval(randomBounce, 1200)
    
    return () => clearInterval(interval)
  }, [])

  const getButtonStyle = (key) => {
    const state = buttonStates[key]
    return {
      ...linkStyle,
      display: 'inline-block',
      transform: `translateY(${state.y}px) scale(${state.bouncing ? 1.05 : 1})`,
      transition: state.bouncing 
        ? 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)' 
        : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      color: isDark ? '#e0e0e0' : '#334',
    }
  }

  const theme = {
    background: isDark ? '#1a1a1a' : '#fff',
    text: isDark ? '#e0e0e0' : '#333',
    border: isDark ? '#444' : '#ccc',
    toggleBg: isDark ? '#2a2a2a' : '#f5f5f5',
  }

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: theme.background,
      fontFamily: '"JetBrainsMono Nerd Font", "JetBrains Mono", monospace',
      transition: 'background-color 0.3s ease',
      position: 'relative',
    }}>
      {/* Theme Toggle in Top Right */}
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

      <h1 style={{
        fontSize: '2rem',
        fontWeight: 500,
        marginBottom: '1.5rem',
        color: theme.text,
        transition: 'color 0.3s ease',
      }}>
        ⚙️ rich clarke
      </h1>
      <nav>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
        }}>
          {/* First Row */}
          <ul style={{
            display: 'flex',
            gap: '1.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            alignItems: 'flex-end',
            minHeight: '35px',
          }}>
            <li><Link to="/" style={getButtonStyle('home')}>home</Link></li>
            <li><Link to="/art" style={getButtonStyle('drawing')}>drawing</Link></li>
            <li><Link to="/blog" style={getButtonStyle('blog')}>blog</Link></li>
            <li><Link to="/homelab" style={getButtonStyle('homelab')}>homelab</Link></li>
          </ul>
          {/* Second Row */}
          <ul style={{
            display: 'flex',
            gap: '1.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            alignItems: 'flex-end',
            minHeight: '35px',
          }}>
            <li><a href="https://github.com/gluk0" style={getButtonStyle('git')} target="_blank" rel="noopener noreferrer">git</a></li>
            <li><a href="mailto:me@rich-clarke.dev" style={getButtonStyle('contact')} target="_blank" rel="noopener noreferrer">contact</a></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

const linkStyle = {
  textDecoration: 'none',
  fontSize: '1rem',
}

export default Home
