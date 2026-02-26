import { Request, Response } from 'express';
import pool from '../db/index.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { AuthRequest } from '../types/auth.js';

export const getBikes = async (req: Request, res: Response) => {
  const { location, date, type } = req.query;
  
  try {
    let query = 'SELECT * FROM bikes WHERE is_available = TRUE';
    const params: any[] = [];

    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    const [bikes] = await pool.query<RowDataPacket[]>(query, params);
    res.json(bikes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bikes' });
  }
};

export const addBike = async (req: AuthRequest, res: Response) => {
  const { model, type, hourly_rate, location, image_url } = req.body;

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO bikes (model, type, hourly_rate, location, image_url) VALUES (?, ?, ?, ?, ?)',
      [model, type, hourly_rate, location, image_url]
    );

    res.status(201).json({ message: 'Bike added successfully', bikeId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding bike' });
  }
};

export const updateBike = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { model, type, hourly_rate, location, image_url, is_available } = req.body;

  try {
    await pool.query(
      'UPDATE bikes SET model = ?, type = ?, hourly_rate = ?, location = ?, image_url = ?, is_available = ? WHERE id = ?',
      [model, type, hourly_rate, location, image_url, is_available, id]
    );

    res.json({ message: 'Bike updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating bike' });
  }
};

export const deleteBike = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM bikes WHERE id = ?', [id]);
    res.json({ message: 'Bike deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting bike' });
  }
};
