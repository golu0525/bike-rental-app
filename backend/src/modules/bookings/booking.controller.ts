import { Response } from 'express';
import { AuthRequest } from '../auth/auth.types.js';
import { BookingService } from './booking.service.js';

const bookingService = new BookingService();

export const createBooking = async (req: AuthRequest, res: Response) => {
  const { bike_id, start_time, end_time } = req.body;
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const result = await bookingService.createBooking(user_id, bike_id, start_time, end_time);
    res.status(201).json({ message: 'Booking created successfully', ...result });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Error creating booking' });
  }
};

export const getUserBookings = async (req: AuthRequest, res: Response) => {
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const bookings = await bookingService.getUserBookings(user_id);
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching bookings' });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response) => {
  const id = String(req.params.id);
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const result = await bookingService.cancelBooking(id, user_id);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error cancelling booking' });
  }
};
