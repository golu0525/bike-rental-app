import pool from '../../config/db.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { differenceInHours } from 'date-fns';

export class BookingService {
  async createBooking(user_id: number, bike_id: number, start_time: string, end_time: string) {
    // Check bike availability and rate
    const [bikes] = await pool.query<RowDataPacket[]>(
      'SELECT hourly_rate, is_available FROM bikes WHERE id = ?',
      [bike_id]
    );

    const bike = bikes[0];
    if (!bike || !bike.is_available) {
      throw new Error('Bike is not available');
    }

    // Calculate total amount
    const hours = differenceInHours(new Date(end_time), new Date(start_time));
    if (hours <= 0) {
      throw new Error('Invalid rental duration');
    }

    const total_amount = hours * bike.hourly_rate;

    // Create booking in a transaction would be better
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO subscriptions (user_id, bike_id, start_time, end_time, total_amount, status) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, bike_id, start_time, end_time, total_amount, 'ACTIVE']
    );

    // Update bike availability
    await pool.query('UPDATE bikes SET is_available = FALSE WHERE id = ?', [bike_id]);

    return { bookingId: result.insertId, total_amount };
  }

  async getUserBookings(user_id: number) {
    const [bookings] = await pool.query<RowDataPacket[]>(
      'SELECT s.*, b.model, b.location FROM subscriptions s JOIN bikes b ON s.bike_id = b.id WHERE s.user_id = ?',
      [user_id]
    );
    return bookings;
  }

  async cancelBooking(id: string, user_id: number) {
    const [bookings] = await pool.query<RowDataPacket[]>(
      'SELECT bike_id FROM subscriptions WHERE id = ? AND user_id = ?',
      [id, user_id]
    );

    if (bookings.length === 0) {
      throw new Error('Booking not found');
    }

    const bike_id = bookings[0]!.bike_id;
    await pool.query('UPDATE subscriptions SET status = "CANCELLED" WHERE id = ?', [id]);
    await pool.query('UPDATE bikes SET is_available = TRUE WHERE id = ?', [bike_id]);

    return { message: 'Booking cancelled' };
  }
}
