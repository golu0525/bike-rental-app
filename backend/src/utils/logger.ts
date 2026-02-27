/**
 * Simple logger utility
 */
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`ℹ️  [INFO] ${message}`, data ? data : '');
  },
  error: (message: string, error?: any) => {
    console.error(`❌ [ERROR] ${message}`, error ? error : '');
  },
  warn: (message: string, data?: any) => {
    console.warn(`⚠️  [WARN] ${message}`, data ? data : '');
  },
  success: (message: string, data?: any) => {
    console.log(`✅ [SUCCESS] ${message}`, data ? data : '');
  },
  debug: (message: string, data?: any) => {
    if (process.env.DEBUG === 'true') {
      console.debug(`🐛 [DEBUG] ${message}`, data ? data : '');
    }
  }
};
