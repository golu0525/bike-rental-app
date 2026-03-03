import pool from '../backend/src/config/db.js';
(async () => {
  const phone = '+917597867068';
  const hash = '$2b$10$sJLvSrNnSLu6I458DCHaOu82vzC7etcMB48th17.s6SLkYQ0CBkZm';
  await pool.query('UPDATE otp_codes SET code_hash=?, expires_at=DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE phone=?', [hash, phone]);
  console.log('updated');
  process.exit(0);
})();
