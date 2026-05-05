import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import https from 'https';

// Configuramos el agente para omitir la validación de certificados (necesario para el puerto 543)
const agent = new https.Agent({
  rejectUnauthorized: false
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  // URL con el puerto 543 y el ID dinámico
  const EXTERNAL_API_URL = `https://servicesatlanticnew.atlanticqi.com:543/api/AtlanticQI/turno/${id}`;

  try {
    const response = await axios.get(EXTERNAL_API_URL, {
      httpsAgent: agent
    });

    // Devolvemos la respuesta tal cual la manda el endpoint original
    return res.status(200).json(response.data);

  } catch (error: any) {
    // Si la API externa falla o no devuelve datos, mandamos el JSON de error que pediste
    console.error('Error en turnos:', error.message);

    return res.status(200).json({
      data: {
        listTurno: "❌ Hubo un error al consultar tus turnos."
      }
    });
  }
}