import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import https from 'https';

// Creamos un único agente para reutilizarlo (mejor para el rendimiento)
const agent = new https.Agent({
    rejectUnauthorized: false // <--- Esto ignora el error del certificado
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { id, winUser } = req.query;

    try {


        // ✅ Forma moderna y segura (WHATWG URL API)
        const base = "https://servicesatlanticnew.atlanticqi.com";
        const puerto = "543";
        const endpoint = `/api/AtlanticQI/${id}`;

        const finalUrl = new URL(endpoint, `${base}:${puerto}`);

        console.log(finalUrl.href); // Imprimirá exactamente: https://tu-dominio-atlantic.com:543/api/v1/data

        const response = await axios.get(finalUrl.href, {
            httpsAgent: agent, // Aplicamos el agente aquí
            params: winUser ? { winUser } : {}
        });



        return res.status(200).json(response.data);
    } catch (error: any) {
        return res.status(error.response?.status || 500).json({
            error: 'Error consultando API externa',
            message: error.message
        });
    }
}