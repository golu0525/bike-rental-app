import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/error.middleware.js';

// Import routes
import authRoutes from './modules/auth/auth.routes.js';
import bikeRoutes from './modules/bikes/bike.routes.js';
import bookingRoutes from './modules/bookings/booking.routes.js';
import otpRoutes from './modules/otp/otp.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth/otp', otpRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Bike Rental API is running' });
});

// Error handler middleware (must be last)
app.use(errorHandler);

export default app;
