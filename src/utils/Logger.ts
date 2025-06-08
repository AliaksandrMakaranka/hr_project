type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const log = (level: LogLevel, message: string, data?: unknown) => {
  if (process.env.NODE_ENV !== 'development') return;

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  switch (level) {
    case 'debug':
      console.debug(prefix, message, data || '');
      break;
    case 'info':
      console.info(prefix, message, data || '');
      break;
    case 'warn':
      console.warn(prefix, message, data || '');
      break;
    case 'error':
      console.error(prefix, message, data || '');
      break;
  }
};

export class Logger {
  private static instance: Logger;

  private constructor() { }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public debug(message: string, data?: unknown): void {
    log('debug', message, data);
  }

  public info(message: string, data?: unknown): void {
    log('info', message, data);
  }

  public warn(message: string, data?: unknown): void {
    log('warn', message, data);
  }

  public error(message: string, data?: unknown): void {
    log('error', message, data);
  }
}

export const logger = {
  debug: (message: string, data?: unknown) => log('debug', message, data),
  info: (message: string, data?: unknown) => log('info', message, data),
  warn: (message: string, data?: unknown) => log('warn', message, data),
  error: (message: string, data?: unknown) => log('error', message, data),
}; 