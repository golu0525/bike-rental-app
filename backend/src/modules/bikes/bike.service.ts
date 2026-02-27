import pool from '../../config/db.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Bike } from './bike.types.js';

export class BikeService {
  async getBikes(location?: string, type?: string) {
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
    return bikes;
  }

  async addBike(model: string, type: string, hourly_rate: number, location: string, image_url?: string) {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO bikes (model, type, hourly_rate, location, image_url) VALUES (?, ?, ?, ?, ?)',
      [model, type, hourly_rate, location, image_url || null]
    );

    return { bikeId: result.insertId };
  }

  async updateBike(id: string, data: Partial<Bike>) {
    const { model, type, hourly_rate, location, image_url, is_available } = data;

    await pool.query(
      'UPDATE bikes SET model = ?, type = ?, hourly_rate = ?, location = ?, image_url = ?, is_available = ? WHERE id = ?',
      [model, type, hourly_rate, location, image_url, is_available, id]
    );

    return { message: 'Bike updated successfully' };
  }

  async deleteBike(id: string) {
    await pool.query('DELETE FROM bikes WHERE id = ?', [id]);
    return { message: 'Bike deleted successfully' };
  }
}
