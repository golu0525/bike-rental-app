import dotenv from 'dotenv';

dotenv.config();

export const env = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'bike_rental_db',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};

export default env;
