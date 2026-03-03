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

  // OTP settings
  OTP_EXPIRY_MINUTES: Number(process.env.OTP_EXPIRY_MINUTES) || 5,
  OTP_MAX_ATTEMPTS: Number(process.env.OTP_MAX_ATTEMPTS) || 5,
  OTP_REQUEST_INTERVAL: Number(process.env.OTP_REQUEST_INTERVAL) || 60, // seconds

  // SMS provider
  SMS_API_KEY: process.env.SMS_API_KEY || '',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};

export default env;
