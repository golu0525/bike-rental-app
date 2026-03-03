import pool from '../backend/src/config/db.js';
import bcrypt from 'bcryptjs';

(async () => {
  const phone = '+917597867068';
  const [rows] = await pool.query<any[]>('SELECT code_hash FROM otp_codes WHERE phone = ?', [phone]);
  if (rows.length === 0) {
    console.log('no record');
    return;
  }
  const hash = rows[0].code_hash;
  for (let i = 0; i < 1000000; i++) {
    const code = String(i).padStart(6, '0');
    if (await bcrypt.compare(code, hash)) {
      console.log('found code', code);
      break;
    }
  }
})();
