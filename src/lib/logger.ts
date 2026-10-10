/**
 * Centralized logging utility
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private log(level: LogLevel, message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}]`;

    if (this.isDevelopment) {
      console.log(`${prefix} ${message}`, data || '');
    }

    // Could be extended to send logs to a service
    this.sendToService(level, message, data);
  }

  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, error?: any): void {
    this.log(LogLevel.ERROR, message, error);
  }

  private sendToService(level: LogLevel, message: string, data?: any): void {
    // Implementation to send logs to external service
    // e.g., Sentry, LogRocket, etc.
  }
}

export const logger = new Logger();
