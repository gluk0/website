import React from 'react'
import ThemeToggle from '../components/ThemeToggle'
import BackButton from '../components/BackButton'
import { useTheme } from '../hooks'
import './Blog.css'

const Blog = () => {
  const { isDark, theme, toggleTheme } = useTheme()

  return (
    <div className="page-container" style={{ backgroundColor: theme.background }}>
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} theme={theme} />
      <BackButton theme={theme} />

      <div className="page-content">
        <h1 className="page-title" style={{ color: theme.text }}>
        </h1>
        
        <div className="blog-content" style={{ color: theme.text }}>
          <p>Add content from github pages maybe?</p>
        </div>
      </div>
    </div>
  )
}

export default Blog
