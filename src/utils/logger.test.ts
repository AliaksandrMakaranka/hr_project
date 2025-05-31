import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from './logger';

describe('logger', () => {
  const originalEnv = process.env.NODE_ENV;
  const consoleSpy = {
    debug: vi.spyOn(console, 'debug'),
    info: vi.spyOn(console, 'info'),
    warn: vi.spyOn(console, 'warn'),
    error: vi.spyOn(console, 'error'),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('should not log in production environment', () => {
    process.env.NODE_ENV = 'production';
    
    logger.debug('test debug');
    logger.info('test info');
    logger.warn('test warn');
    logger.error('test error');

    expect(consoleSpy.debug).not.toHaveBeenCalled();
    expect(consoleSpy.info).not.toHaveBeenCalled();
    expect(consoleSpy.warn).not.toHaveBeenCalled();
    expect(consoleSpy.error).not.toHaveBeenCalled();
  });

  it('should log in development environment', () => {
    process.env.NODE_ENV = 'development';
    
    const testData = { test: 'data' };
    
    logger.debug('test debug', testData);
    logger.info('test info', testData);
    logger.warn('test warn', testData);
    logger.error('test error', testData);

    expect(consoleSpy.debug).toHaveBeenCalled();
    expect(consoleSpy.info).toHaveBeenCalled();
    expect(consoleSpy.warn).toHaveBeenCalled();
    expect(consoleSpy.error).toHaveBeenCalled();

    // Check that each log includes timestamp and level
    const calls = [
      consoleSpy.debug.mock.calls[0],
      consoleSpy.info.mock.calls[0],
      consoleSpy.warn.mock.calls[0],
      consoleSpy.error.mock.calls[0],
    ];

    calls.forEach(call => {
      const [prefix, message, data] = call;
      expect(prefix).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\] \[(DEBUG|INFO|WARN|ERROR)\]/);
      expect(message).toBeDefined();
      expect(data).toEqual(testData);
    });
  });

  it('should handle undefined data', () => {
    process.env.NODE_ENV = 'development';
    
    logger.debug('test debug');
    logger.info('test info');
    logger.warn('test warn');
    logger.error('test error');

    const calls = [
      consoleSpy.debug.mock.calls[0],
      consoleSpy.info.mock.calls[0],
      consoleSpy.warn.mock.calls[0],
      consoleSpy.error.mock.calls[0],
    ];

    calls.forEach(call => {
      const [prefix, message, data] = call;
      expect(prefix).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\] \[(DEBUG|INFO|WARN|ERROR)\]/);
      expect(message).toBeDefined();
      expect(data).toBe('');
    });
  });
}); 