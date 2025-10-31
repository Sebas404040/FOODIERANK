import { obtenerBD } from "../config/db.js";

const COLECCION_RESENAS_RESTAURANTES = "resenas_restaurantes";
const COLECCION_RESENAS_PLATOS = "resenas_platos";
const COLECCION_RESTAURANTES = "restaurantes";
const COLECCION_PLATOS = "platos";

export async function rankingRestaurantes() {
    try {
        const db = obtenerBD();
        const rankingRestaurantes = await db.collection(COLECCION_RESENAS_RESTAURANTES).aggregate([
            {
                $group: {
                    _id: "$restauranteId",
                    promedioEstrellas: { $avg: "$calificacion" }
                }
            },
            { $sort: { promedioEstrellas: -1 } },
            {
                $lookup: {
                    from: COLECCION_RESTAURANTES,
                    localField: "_id",
                    foreignField: "id",
                    as: "infoRestaurante"
                }
            },
            {
                $unwind: "$infoRestaurante"
            },
            {
                $project: {
                    _id: 0,
                    restauranteId: "$_id",
                    nombre: "$infoRestaurante.nombre",
                    descripcion: "$infoRestaurante.descripcion",
                    promedioEstrellas: { $round: ["$promedioEstrellas", 2] }
                }
            }
        ]).toArray();
        return rankingRestaurantes;
    } catch (error) {
        throw new Error("Error al obtener el ranking de restaurantes: " + error.message);
    }
}

export async function rankingPlatos() {
    try {
        const db = obtenerBD();
        const rankingPlatos = await db.collection(COLECCION_RESENAS_PLATOS).aggregate([
            {
                $group: {
                    _id: "$platoId",
                    promedioEstrellas: { $avg: "$calificacion" }
                }
            },
            { $sort: { promedioEstrellas: -1 } },
            {
                $lookup: {
                    from: COLECCION_PLATOS,
                    localField: "_id",
                    foreignField: "id",
                    as: "infoPlato"
                }
            },
            {
                $unwind: "$infoPlato"
            },
            {
                $lookup: {
                    from: COLECCION_RESTAURANTES,
                    localField: "infoPlato.id_restaurante",
                    foreignField: "id",
                    as: "infoRestaurante"
                }
            },
            {
                $unwind: "$infoRestaurante"
            },
            {
                $project: {
                    _id: 0,
                    platoId: "$_id",
                    nombrePlato: "$infoPlato.nombre",
                    descripcionPlato: "$infoPlato.descripcion",
                    nombreRestaurante: "$infoRestaurante.nombre",
                    promedioEstrellas: { $round: ["$promedioEstrellas", 2] }
                }
            }
        ]).toArray();
        return rankingPlatos;
    } catch (error) {
        throw new Error("Error al obtener el ranking de platos: " + error.message);
    }
}