const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres.mhovdyapnvjcoqtsfmdt", // Usuario de tu imagen
  host: "aws-1-us-east-2.pooler.supabase.com", // Host de tu imagen
  database: "postgres", // Base de datos por defecto en Supabase
  password: "Yonatan25@@", // Tu contraseña
  port: 6543, // Puerto de Supabase
  ssl: {
    rejectUnauthorized: false // Requerido para conexiones externas a Supabase
  }
});

// Prueba de conexión
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error("❌ ERROR DE CONEXIÓN A SUPABASE:", err.message);
  } else {
    console.log("✅ ¡CONECTADO A SUPABASE! La base de datos en la nube responde.");
  }
});

module.exports = pool;