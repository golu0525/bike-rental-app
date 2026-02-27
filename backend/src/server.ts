import app from './app.js';
import { env } from './config/env.js';
import { initializeDatabase } from './db/init.js';
import { logger } from './utils/logger.js';

const PORT = env.PORT;

// Initialize and start server
(async () => {
  try {
    logger.info('🔧 Initializing database...');
    await initializeDatabase();

    app.listen(PORT, () => {
      logger.success(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('❌ Failed to initialize database. Server startup aborted.', error);
    process.exit(1);
  }
})();
