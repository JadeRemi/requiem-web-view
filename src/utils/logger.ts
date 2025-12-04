/**
 * Winston-style Unified Logger
 * 
 * Provides structured, leveled logging with:
 * - Log levels: error, warn, info, debug, trace
 * - Colored output in development
 * - Timestamps
 * - Context/module tagging
 * - Production-safe (can disable verbose logs)
 */

export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: string
  data?: unknown
}

interface LoggerConfig {
  /** Minimum level to output (default: 'info' in prod, 'debug' in dev) */
  minLevel: LogLevel
  /** Whether to show timestamps */
  showTimestamp: boolean
  /** Whether to use colors in console */
  useColors: boolean
  /** Whether logging is enabled at all */
  enabled: boolean
}

/** Log level priority (higher = more severe) */
const LOG_LEVELS: Record<LogLevel, number> = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
}

/** Console colors for each level */
const LEVEL_COLORS: Record<LogLevel, string> = {
  trace: '#8e8e96',  // grey-400
  debug: '#71717a',  // grey-450
  info: '#3b82f6',   // blue
  warn: '#f59e0b',   // amber
  error: '#ef4444',  // red
}

/** Console methods for each level */
const CONSOLE_METHODS: Record<LogLevel, 'log' | 'warn' | 'error' | 'debug'> = {
  trace: 'debug',
  debug: 'debug',
  info: 'log',
  warn: 'warn',
  error: 'error',
}

/** Default configuration */
const DEFAULT_CONFIG: LoggerConfig = {
  minLevel: import.meta.env.PROD ? 'info' : 'debug',
  showTimestamp: true,
  useColors: !import.meta.env.PROD,
  enabled: true,
}

/** Global logger configuration */
let globalConfig: LoggerConfig = { ...DEFAULT_CONFIG }

/**
 * Configure the global logger
 */
export function configureLogger(config: Partial<LoggerConfig>): void {
  globalConfig = { ...globalConfig, ...config }
}

/**
 * Get current ISO timestamp
 */
function getTimestamp(): string {
  return new Date().toISOString()
}

/**
 * Format log entry for console output
 */
function formatLogEntry(entry: LogEntry): string[] {
  const parts: string[] = []
  
  if (globalConfig.showTimestamp) {
    parts.push(`[${entry.timestamp.split('T')[1]?.slice(0, 8) ?? entry.timestamp}]`)
  }
  
  parts.push(`[${entry.level.toUpperCase()}]`)
  
  if (entry.context) {
    parts.push(`[${entry.context}]`)
  }
  
  parts.push(entry.message)
  
  return parts
}

/**
 * Output log entry to console
 */
function outputLog(entry: LogEntry): void {
  if (!globalConfig.enabled) return
  
  const levelPriority = LOG_LEVELS[entry.level]
  const minPriority = LOG_LEVELS[globalConfig.minLevel]
  
  if (levelPriority < minPriority) return
  
  const method = CONSOLE_METHODS[entry.level]
  const parts = formatLogEntry(entry)
  const message = parts.join(' ')
  
  if (globalConfig.useColors) {
    const color = LEVEL_COLORS[entry.level]
    const style = `color: ${color}; font-weight: ${entry.level === 'error' ? 'bold' : 'normal'}`
    
    if (entry.data !== undefined) {
      console[method](`%c${message}`, style, entry.data)
    } else {
      console[method](`%c${message}`, style)
    }
  } else {
    if (entry.data !== undefined) {
      console[method](message, entry.data)
    } else {
      console[method](message)
    }
  }
}

/**
 * Create a log entry and output it
 */
function log(level: LogLevel, message: string, context?: string, data?: unknown): void {
  const entry: LogEntry = {
    level,
    message,
    timestamp: getTimestamp(),
  }
  
  if (context !== undefined) {
    entry.context = context
  }
  
  if (data !== undefined) {
    entry.data = data
  }
  
  outputLog(entry)
}

/**
 * Logger instance with optional context
 */
export interface Logger {
  error: (message: string, data?: unknown) => void
  warn: (message: string, data?: unknown) => void
  info: (message: string, data?: unknown) => void
  debug: (message: string, data?: unknown) => void
  trace: (message: string, data?: unknown) => void
  child: (context: string) => Logger
}

/**
 * Create a logger instance
 * @param context - Optional context/module name for log tagging
 */
export function createLogger(context?: string): Logger {
  return {
    error: (message: string, data?: unknown) => log('error', message, context, data),
    warn: (message: string, data?: unknown) => log('warn', message, context, data),
    info: (message: string, data?: unknown) => log('info', message, context, data),
    debug: (message: string, data?: unknown) => log('debug', message, context, data),
    trace: (message: string, data?: unknown) => log('trace', message, context, data),
    child: (childContext: string) => createLogger(context ? `${context}:${childContext}` : childContext),
  }
}

/** Default root logger */
export const logger = createLogger()

/**
 * Quick logging functions (no context)
 */
export const logError = (message: string, data?: unknown): void => log('error', message, undefined, data)
export const logWarn = (message: string, data?: unknown): void => log('warn', message, undefined, data)
export const logInfo = (message: string, data?: unknown): void => log('info', message, undefined, data)
export const logDebug = (message: string, data?: unknown): void => log('debug', message, undefined, data)
export const logTrace = (message: string, data?: unknown): void => log('trace', message, undefined, data)

