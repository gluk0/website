import { useState } from 'react'

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false)

  const theme = {
    background: isDark ? '#1a1a1a' : '#fff',
    text: isDark ? '#e0e0e0' : '#333',
    textSecondary: isDark ? '#999' : '#666',
    border: isDark ? '#444' : '#ccc',
    toggleBg: isDark ? '#2a2a2a' : '#f5f5f5',
    codeBg: isDark ? '#2a2a2a' : '#f5f5f5',
    tableHeader: isDark ? '#2a2a2a' : '#f0f0f0',
    tableRow: isDark ? '#222' : '#fafafa',
  }

  const toggleTheme = () => setIsDark(!isDark)

  return {
    isDark,
    theme,
    toggleTheme,
  }
}
