import React from 'react'
import SketchWrapper from '../components/SketchWrapper'
import ThemeToggle from '../components/ThemeToggle'
import BackButton from '../components/BackButton'
import { useTheme } from '../hooks'
import voronoi_sketch from '../sketches/voronoi_point'
import './Art.css'

const Art = () => {
  const { isDark, theme, toggleTheme } = useTheme()

  return (
    <div className="page-container" style={{ backgroundColor: theme.background }}>
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} theme={theme} />
      <BackButton theme={theme} />

      <div className="page-content">
        <h1 className="page-title" style={{ color: theme.text }}>
        </h1>
        
        <SketchWrapper sketch={voronoi_sketch} />
      </div>
    </div>
  )
}

export default Art