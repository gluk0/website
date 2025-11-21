import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks'
import ThemeToggle from '../components/ThemeToggle'
import './Home.css'

const Home = () => {
  const { isDark, theme, toggleTheme } = useTheme()
  const [buttonStates, setButtonStates] = useState({
    home: { y: 0, bouncing: false },
    drawing: { y: 0, bouncing: false },
    blog: { y: 0, bouncing: false },
    homelab: { y: 0, bouncing: false },
    git: { y: 0, bouncing: false },
    contact: { y: 0, bouncing: false },
  })

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
      display: 'inline-block',
      transform: `translateY(${state.y}px) scale(${state.bouncing ? 1.05 : 1})`,
      transition: state.bouncing 
        ? 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)' 
        : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      color: theme.text,
    }
  }

  return (
    <div className="home-container" style={{ backgroundColor: theme.background }}>
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} theme={theme} />

      <h1 className="home-title" style={{ color: theme.text }}>
        ⚙️ rich clarke
      </h1>
      <nav>
        <div className="home-nav-wrapper">
          <ul className="home-nav-list">
            <li><Link to="/" className="home-nav-link" style={getButtonStyle('home')}>home</Link></li>
            <li><Link to="/art" className="home-nav-link" style={getButtonStyle('drawing')}>drawing</Link></li>
            <li><Link to="/blog" className="home-nav-link" style={getButtonStyle('blog')}>blog</Link></li>
            <li><Link to="/homelab" className="home-nav-link" style={getButtonStyle('homelab')}>homelab</Link></li>
          </ul>
          <ul className="home-nav-list">
            <li><a href="https://github.com/gluk0" className="home-nav-link" style={getButtonStyle('git')} target="_blank" rel="noopener noreferrer">git</a></li>
            <li><a href="mailto:me@rich-clarke.dev" className="home-nav-link" style={getButtonStyle('contact')} target="_blank" rel="noopener noreferrer">contact</a></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Home
