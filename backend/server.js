const express = require('express');
const path = require('path');
const pool = require('./db'); // 1. IMPORTANTE: Importar la conexión a la base de datos
const { exec } = require('youtube-dl-exec');
const app = express();

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

// RUTA PARA DESCARGAR
app.get('/api/download', async (req, res) => {
    const { url, format } = req.query;
    
    if (!url) return res.status(400).send('Falta la URL');

    console.log(`Descargando: ${url} en formato ${format}`);

    try {
        // 2. GUARDADO EN BASE DE DATOS (Real)
        // Usamos los nombres de columna de tu imagen de pgAdmin: url y format
        const queryText = 'INSERT INTO downloads(url, format) VALUES($1, $2)';
        await pool.query(queryText, [url, format]);
        console.log('✅ Registro guardado en la tabla downloads');

        // 3. LÓGICA DE DESCARGA REAL
        res.header('Content-Disposition', `attachment; filename="multitools_download.${format}"`);

        const streamer = exec(url, {
            output: '-',
            format: format === 'mp3' ? 'bestaudio' : 'best',
        }, { stdio: ['ignore', 'pipe', 'ignore'] });

        streamer.stdout.pipe(res);

    } catch (error) {
        console.error('❌ Error en el servidor:', error);
        // Si el error es de la descarga, al menos ya intentamos guardar en BD
        if (!res.headersSent) {
            res.status(500).send('Error al procesar la solicitud');
        }
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(3000, () => {
    console.log('Servidor real corriendo en http://localhost:3000');
});