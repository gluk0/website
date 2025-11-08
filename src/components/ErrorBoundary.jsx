import React from 'react'
import PropTypes from 'prop-types'

/**
 * Error Boundary component to catch JavaScript errors anywhere in the child component tree
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {React.ComponentType} props.FallbackComponent - Component to render when error occurs
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo)
    }
  }

  logErrorToService = (error, errorInfo) => {
    console.warn('Error logged to external service:', { error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.FallbackComponent) {
        const FallbackComponent = this.props.FallbackComponent
        return <FallbackComponent error={this.state.error} resetError={() => this.setState({ hasError: false, error: null, errorInfo: null })} />
      }

      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '1px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
          color: '#c92a2a',
          fontFamily: 'JetBrains Mono, monospace'
        }}>
          <h2>🚨 Something went wrong</h2>
          <details style={{ marginTop: '10px' }}>
            <summary>Error Details (click to expand)</summary>
            <pre style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#fff',
              border: '1px solid #e9ecef',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {this.state.error && this.state.error.toString()}
              {this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            style={{
              marginTop: '15px',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  FallbackComponent: PropTypes.elementType,
}

export default ErrorBoundary
