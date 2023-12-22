const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

const pool = new Pool({
  user: 'default',
  host: 'ep-wispy-dust-47821402-pooler.us-east-1.postgres.vercel-storage.com',
  database: 'verceldb',
  password: 'JN3H6DCOshmT',
  port: 5432,
});

app.use(bodyParser.json());

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error al conectar a la base de datos:', err);
  }
  console.log('Conexión a la base de datos establecida');

  client.query('SELECT NOW()', (queryErr, result) => {
    release(); 

    if (queryErr) {
      return console.error('Error al ejecutar la consulta de prueba:', queryErr);
    }
    console.log('Consulta de prueba exitosa. Resultado:', result.rows[0].now);
  });
});

app.post('/login', async (req, res) => {


  const { username, password } = req.body;


  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE username = $1 AND password = $2', [username, password]);


    if (result.rows.length > 0) {
      res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
    if (result.rows.length > 0) {
      const tipoUsuario = result.rows[0].tipo_usuario;
      res.json({ tipoUsuario });
    }
    

  } catch (error) {
    console.error('Error en la consulta a la base de datos', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Node.js en http://localhost:${port}`);
});









