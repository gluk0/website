import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header style={{
      fontFamily: '"JetBrainsMono Nerd Font", "JetBrains Mono", monospace',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottom: '1px solid #eee'
    }}>
      <Link to="/" style={{
        fontSize: '1.3rem',
        fontWeight: 500,
        textDecoration: 'none',
        color: '#333'
      }}>
        ⚙️ rich clarke
      </Link>
    </header>
  )
}

export default Header 
