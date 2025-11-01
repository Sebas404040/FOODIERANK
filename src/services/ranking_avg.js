import { obtenerBD } from "../config/db.js";

const COLECCION_RESENAS_RESTAURANTES = "resenas_restaurantes";
const COLECCION_RESENAS_PLATOS = "resenas_platos";
const COLECCION_RESTAURANTES = "restaurantes";
const COLECCION_PLATOS = "platos";

export async function rankingRestaurantes(id) {
    try {
        const db = obtenerBD();
        const resultado = await db.collection(COLECCION_RESENAS_RESTAURANTES).aggregate([
            { $match: { restauranteId: id } },
            {
                $group: {
                    _id: "$restauranteId",
                    promedioEstrellas: { $avg: "$calificacion" }
                }
            },
            {
                $project: {
                    _id: 0,
                    promedioEstrellas: { $round: ["$promedioEstrellas", 2] }
                }
            }
        ]).toArray();

        return resultado[0]?.promedioEstrellas || 0;
    } catch (error) {
        throw new Error("Error al obtener el ranking de restaurantes: " + error.message);
    }
}

export async function rankingPlatos(id) {
    try {
        const db = obtenerBD();
        const resultado = await db.collection(COLECCION_RESENAS_PLATOS).aggregate([
        { $match: { platoId: id } },
        {
            $group: {
                _id: "$platoId",
                promedioEstrellas: { $avg: "$calificacion" }
            }
        },
        {
            $project: {
                _id: 0,
                promedioEstrellas: { $round: ["$promedioEstrellas", 2] }
            }
        }
    ]).toArray();

    return resultado[0]?.promedioEstrellas || 0; 
    } catch (error) {
        throw new Error("Error al obtener el ranking de platos: " + error.message);
    }
}