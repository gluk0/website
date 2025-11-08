import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import Home from './pages/Home'
import Art from './pages/Art'
import Blog from './pages/Blog'
import Homelab from './pages/Homelab'
import logger from './utils/logger'

/**
 * Layout component that conditionally shows header
 */
const Layout = ({ children }) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  
  return (
    <div className="App">
      {!isHomePage && (
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      )}
      <main>
        {children}
      </main>
    </div>
  )
}

/**
 * Main App component that handles routing and error boundaries
 * @returns {JSX.Element} Main application component
 */
function App() {
  // Log application initialization
  React.useEffect(() => {
    logger.info('Application initialized', {
      environment: process.env.NODE_ENV,
      version: process.env.REACT_APP_VERSION || '1.0.0',
    })
  }, [])

  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/art" element={<Art />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/homelab" element={<Homelab />} />
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </Layout>
      </Router>
    </ErrorBoundary>
  )
}

/**
 * 404 Not Found component
 * @returns {JSX.Element} Not found page
 */
const NotFound = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    fontFamily: '"JetBrainsMono Nerd Font", "JetBrains Mono", monospace',
    textAlign: 'center',
  }}>
    <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
      The page you're looking for doesn't exist.
    </p>
    <a
      href="/"
      style={{
        padding: '12px 24px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
      }}
    >
      Go Home
    </a>
  </div>
)

export default App 