import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../config/db.js';
import { env } from '../../config/env.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class AuthService {
  async signup(name: string, email: string, password: string, location: string) {
    // Check if user already exists
    const [existingUsers] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO users (name, email, password, location) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, location]
    );

    return { userId: result.insertId };
  }

  async login(email: string, password: string) {
    const [users] = await pool.query<RowDataPacket[]>(
      'SELECT id, name, email, password, role FROM users WHERE email = ?',
      [email]
    );

    const user = users[0];
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = (jwt as any).sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}
