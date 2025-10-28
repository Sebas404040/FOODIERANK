import { obtenerBD } from "../config/db.js";

const COLECCION_RESENAS_RESTAURANTES = "resenas_restaurantes";

export async function obtenerResenasRestaurantes() {
    try {
        return await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).find().toArray();
    } catch (error) {
        throw new Error("Error al obtener las reseñas de restaurantes: " + error.message);
    }
}