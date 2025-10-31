import { obtenerBD } from "../config/db.js";

const COLLECTION__RESENAS_RESTAURANTS = "resenas_restaurantes";

export async function obtenerRankingRestaurantes() {
    try {
        const reseñasRestaurantes = await obtenerBD().collection(COLLECTION__RESENAS_RESTAURANTS).find().toArray();

        reseñasRestaurantes.forEach(reseñaRestaurante => {
            console.log(reseñaRestaurante);
        });
        return reseñasRestaurantes;
    } catch (error) {
        throw new Error("Error al obtener el ranking de restaurantes: " + error.message);
    }
}