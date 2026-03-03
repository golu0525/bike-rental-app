const pool=require('./backend/src/config/db.js').default;
const bcrypt=require('bcryptjs');
(async()=>{
  const phone='+917597867068';
  const [rows]=await pool.query('SELECT code_hash from otp_codes where phone=?',[phone]);
  if(rows.length===0){console.log('no');return;}
  const hash=rows[0].code_hash;
  for(let i=0;i<1000000;i++){
    const code=(''+i).padStart(6,'0');
    if(await bcrypt.compare(code,hash)){
      console.log('found code',code);
      break;
    }
  }
})();
