import mysql from 'mysql2/promise';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

const pool = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
pool.getConnection()
  .then(() => logger.success('Database connected successfully'))
  .catch((err) => logger.error('Database connection failed', err));

export default pool;
