import { Response } from 'express';
import pool from '../db/index.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { AuthRequest } from '../types/auth.js';
import { differenceInHours } from 'date-fns';

export const createSubscription = async (req: AuthRequest, res: Response) => {
  const { bike_id, start_time, end_time } = req.body;
  const user_id = req.user?.id;

  if (!user_id) return res.status(401).json({ message: 'Unauthorized' });

  try {
    // Check bike availability and rate
    const [bikes] = await pool.query<RowDataPacket[]>(
      'SELECT hourly_rate, is_available FROM bikes WHERE id = ?',
      [bike_id]
    );

    const bike = bikes[0];
    if (!bike || !bike.is_available) {
      return res.status(400).json({ message: 'Bike is not available' });
    }

    // Calculate total amount
    const hours = differenceInHours(new Date(end_time), new Date(start_time));
    if (hours <= 0) {
      return res.status(400).json({ message: 'Invalid rental duration' });
    }

    const total_amount = hours * bike.hourly_rate;

    // Create subscription transitively in a transaction would be better, but keeping it simple for now
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO subscriptions (user_id, bike_id, start_time, end_time, total_amount, status) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, bike_id, start_time, end_time, total_amount, 'ACTIVE']
    );

    // Update bike availability
    await pool.query('UPDATE bikes SET is_available = FALSE WHERE id = ?', [bike_id]);

    res.status(201).json({
      message: 'Subscription created successfully',
      subscriptionId: result.insertId,
      total_amount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating subscription' });
  }
};

export const getUserSubscriptions = async (req: AuthRequest, res: Response) => {
  const user_id = req.user?.id;

  try {
    const [subs] = await pool.query<RowDataPacket[]>(
      'SELECT s.*, b.model, b.location FROM subscriptions s JOIN bikes b ON s.bike_id = b.id WHERE s.user_id = ?',
      [user_id]
    );
    res.json(subs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching subscriptions' });
  }
};

export const cancelSubscription = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const [subs] = await pool.query<RowDataPacket[]>(
      'SELECT bike_id FROM subscriptions WHERE id = ?',
      [id]
    );

    if (subs.length > 0) {
      const bike_id = subs[0]!.bike_id;
      await pool.query('UPDATE subscriptions SET status = "CANCELLED" WHERE id = ?', [id]);
      await pool.query('UPDATE bikes SET is_available = TRUE WHERE id = ?', [bike_id]);
      res.json({ message: 'Subscription cancelled' });
    } else {
      res.status(404).json({ message: 'Subscription not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelling subscription' });
  }
};
