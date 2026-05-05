import express from 'express';
import axios from 'axios';
import https from 'https';

const app = express();
const PORT = process.env.PORT || 3000;

const agent = new https.Agent({
    rejectUnauthorized: false
});

// 🔹 Ruta normal
app.get('/proxy/:id', async (req, res) => {
    const { id } = req.params;
    const { winUser } = req.query;

    try {
        const url = `https://servicesatlanticnew.atlanticqi.com:543/api/AtlanticQI/${id}`;

        const response = await axios.get(url, {
            httpsAgent: agent,
            params: winUser ? { winUser } : {}
        });

        res.json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: 'Error en proxy',
            message: error.message
        });
    }
});

// 🔹 Ruta turno
app.get('/proxy/turno/:id', async (req, res) => {
    const { id } = req.params;
    const { winUser } = req.query;

    try {
        const url = `https://servicesatlanticnew.atlanticqi.com:543/api/AtlanticQI/turno/${id}`;

        const response = await axios.get(url, {
            httpsAgent: agent,
            params: winUser ? { winUser } : {}
        });

        res.json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: 'Error en proxy turno',
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy corriendo en puerto ${PORT}`);
});