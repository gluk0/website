/**
 * Centralized logging utility for the application
 */

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
}

class Logger {
  constructor() {
    this.level = process.env.NODE_ENV === 'production' ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG
    this.logs = []
    this.maxLogs = 1000
  }

  setLevel(level) {
    this.level = level
  }

  error(message, error = null, context = {}) {
    if (this.level >= LOG_LEVELS.ERROR) {
      this.log('ERROR', message, error, context)
    }
  }

  warn(message, context = {}) {
    if (this.level >= LOG_LEVELS.WARN) {
      this.log('WARN', message, null, context)
    }
  }

  info(message, context = {}) {
    if (this.level >= LOG_LEVELS.INFO) {
      this.log('INFO', message, null, context)
    }
  }

  debug(message, context = {}) {
    if (this.level >= LOG_LEVELS.DEBUG) {
      this.log('DEBUG', message, null, context)
    }
  }

  log(level, message, error = null, context = {}) {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      level,
      message,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : null,
      context,
      url: window.location.href,
      userAgent: navigator.userAgent,
    }

    // Add to internal logs array
    this.logs.push(logEntry)
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }

    // Console output
    const consoleMethod = level === 'ERROR' ? 'error' :
                         level === 'WARN' ? 'warn' :
                         level === 'INFO' ? 'info' : 'debug'

    console[consoleMethod](`[${timestamp}] ${level}: ${message}`, {
      error,
      context,
      ...logEntry,
    })

    // Send to external logging service in production
    if (process.env.NODE_ENV === 'production' && level === 'ERROR') {
      this.sendToExternalService(logEntry)
    }
  }

  sendToExternalService(logEntry) {
    // Placeholder for external logging service integration
    // Example: Cloud Logging, DataDog, New Relic, etc.
    try {
      // Example for Google Cloud Logging
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: logEntry.message,
          fatal: false,
          error: logEntry.error,
        })
      }
    } catch (error) {
      console.error('Failed to send log to external service:', error)
    }
  }

  getLogs(level = null) {
    if (level) {
      return this.logs.filter(log => log.level === level)
    }
    return this.logs
  }

  clearLogs() {
    this.logs = []
  }

  exportLogs() {
    return JSON.stringify(this.logs, null, 2)
  }
}

// Create singleton instance
const logger = new Logger()

// Export utility functions
export const logError = (message, error, context) => logger.error(message, error, context)
export const logWarn = (message, context) => logger.warn(message, context)
export const logInfo = (message, context) => logger.info(message, context)
export const logDebug = (message, context) => logger.debug(message, context)

export default logger
