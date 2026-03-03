import pool from '../../config/db.js';
import { env } from '../../config/env.js';
import bcrypt from 'bcryptjs';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import crypto from 'crypto';
import { logger } from '../../utils/logger.js';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

// application-level types
interface UserRow {
  id: number;
  name: string;
  email: string | null;
  role: string;
}


export class OtpService {
  private generateCode() {
    // 6-digit random number padded with leading zeros
    return ('' + crypto.randomInt(0, 1000000)).padStart(6, '0');
  }

  async requestOtp(phone: string) {
    const now = new Date();
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM otp_codes WHERE phone = ?',
      [phone]
    );

    if (rows.length > 0) {
      const existing = rows[0];
      const lastSent = new Date(existing.last_sent_at);
      const diff = (now.getTime() - lastSent.getTime()) / 1000;
      if (diff < env.OTP_REQUEST_INTERVAL) {
        throw new Error(`Please wait ${env.OTP_REQUEST_INTERVAL - Math.floor(diff)} seconds before requesting another code`);
      }
    }

    const code = this.generateCode();
    const hashed = await bcrypt.hash(code, 10);
    const expiresAt = new Date(now.getTime() + env.OTP_EXPIRY_MINUTES * 60000);

    // upsert the otp_codes record
    await pool.query(
      `INSERT INTO otp_codes (phone, code_hash, expires_at, attempts, last_sent_at, failed_attempts)
       VALUES (?, ?, ?, 0, ?, 0)
       ON DUPLICATE KEY UPDATE
         code_hash = VALUES(code_hash),
         expires_at = VALUES(expires_at),
         attempts = 0,
         last_sent_at = VALUES(last_sent_at),
         failed_attempts = 0`,
      [phone, hashed, expiresAt, now]
    );

    // send via SMS provider (placeholder)
    try {
      await this.sendSms(phone, `Your OTP code is ${code}`);
      logger.info('Sent OTP SMS', { phone });
    } catch (e) {
      logger.error('Failed to send OTP SMS', e);
      // still return success to avoid leaking provider errors
    }

    return { message: 'OTP sent' };
  }

  async verifyOtp(phone: string, code: string) {
    const now = new Date();
    const [otpRows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM otp_codes WHERE phone = ?',
      [phone]
    );

    if (otpRows.length === 0) {
      logger.warn('OTP verify failed: no request', { phone });
      throw new Error('Invalid or expired OTP');
    }

    const record: any = otpRows[0];

    // check expiration
    if (new Date(record.expires_at) < now) {
      await this.deleteOtp(phone);
      logger.warn('OTP expired', { phone });
      throw new Error('OTP expired');
    }

    // check attempts
    if (record.attempts >= env.OTP_MAX_ATTEMPTS) {
      await this.deleteOtp(phone);
      logger.warn('OTP max attempts exceeded', { phone });
      throw new Error('Too many failed attempts');
    }

    const match = await bcrypt.compare(code, record.code_hash);
    if (!match) {
      // increment attempts and failed_attempts
      await pool.query('UPDATE otp_codes SET attempts = attempts + 1, failed_attempts = failed_attempts + 1 WHERE phone = ?', [phone]);
      logger.warn('Invalid OTP entered', { phone });
      throw new Error('Invalid OTP');
    }

    // successful verification; delete or expire record
    await this.deleteOtp(phone);

    // find or create user associated with phone
    const [userRows] = await pool.query<RowDataPacket[]>(
      'SELECT id, name, email, role FROM users WHERE phone = ?',
      [phone]
    );
    const users = userRows as unknown as UserRow[];

    let user: UserRow | undefined = users[0];
    if (!user) {
      const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO users (name, phone, role, password) VALUES (?, ?, ?, ?)',
        [`User ${phone}`, phone, 'USER', '']
      );
      user = { id: result.insertId, name: `User ${phone}`, email: null, role: 'USER' };
    }

    // generate JWT
    const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(
      payload,
      env.JWT_SECRET as Secret,
      { expiresIn: env.JWT_EXPIRES_IN as string } as SignOptions
    );

    return { token, user };
  }

  private async deleteOtp(phone: string) {
    await pool.query('DELETE FROM otp_codes WHERE phone = ?', [phone]);
  }

  private async sendSms(phone: string, message: string) {
    if (!env.SMS_API_KEY) {
      // fallback to console log in development
      console.log(`SMS to ${phone}: ${message}`);
      return;
    }

    // TODO: integrate with real SMS API (e.g., Twilio)
    // Example placeholder:
    // await someSmsClient.send({ to: phone, body: message });
    return;
  }
}
