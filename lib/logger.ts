// Simple logging utility for the application
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
} as const;

type LogLevel = keyof typeof LOG_LEVELS;

const CURRENT_LOG_LEVEL: LogLevel = 'DEBUG';

interface LogEntry {
  level: string;
  message: string;
  timestamp: Date;
  source?: string;
}

class Logger {
  private logs: LogEntry[] = [];

  private shouldLog(level: string): boolean {
    const levelValue = LOG_LEVELS[level as LogLevel];
    const currentLevelValue = LOG_LEVELS[CURRENT_LOG_LEVEL];
    return levelValue <= currentLevelValue;
  }

  private addLog(level: string, message: string, source?: string) {
    if (!this.shouldLog(level)) return;

    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      source
    };

    this.logs.push(logEntry);
    console.log(`[${level}] ${source ? `[${source}] ` : ''}${message}`);
  }

  error(message: string, source?: string) {
    this.addLog('ERROR', message, source);
  }

  warn(message: string, source?: string) {
    this.addLog('WARN', message, source);
  }

  info(message: string, source?: string) {
    this.addLog('INFO', message, source);
  }

  debug(message: string, source?: string) {
    this.addLog('DEBUG', message, source);
  }

  getLogs(): LogEntry[] {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
}

// Create a global logger instance
const logger = new Logger();

export default logger;

// Utility function to log component render times
export const logRenderTime = (componentName: string, startTime: number) => {
  const endTime = performance.now();
  const renderTime = endTime - startTime;
  logger.debug(`Render time for ${componentName}: ${renderTime.toFixed(2)}ms`, 'Performance');
};

// Utility function to log API calls
export const logApiCall = (endpoint: string, method: string, duration: number, status: number) => {
  logger.info(`API Call: ${method} ${endpoint} - ${status} (${duration}ms)`, 'API');
};