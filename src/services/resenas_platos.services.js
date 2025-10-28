import { obtenerBD } from "../config/db.js";

const COLECCION_RESENAS_PLATOS = "resenas_platos";
const COLECCION_PLATOS = "platos";

export async function obtenerResenasPlatos() {
    try {
        return await obtenerBD().collection(COLECCION_RESENAS_PLATOS).find().toArray();
    } catch (error) {
        throw new Error("Error al obtener las reseñas de platos: " + error.message);
    }
}

export async function agregarResenaPlato(datos_resena) {
    try {
        const { platoId, usuarioId, calificacion, comentario } = datos_resena;

        if (!platoId || !usuarioId || !calificacion || !comentario) {
            throw new Error("Faltan datos obligatorios para agregar la reseña de plato.");
        }

        const ultimoIdResena = await obtenerBD().collection(COLECCION_RESENAS_PLATOS).find().sort({ id: -1 }).limit(1).toArray();
        const nuevoId = ultimoIdResena.length > 0 ? ultimoIdResena[0].id + 1 : 1;

        const nuevaResena = {
            id: nuevoId,
            platoId: datos_resena.platoId,
            usuarioId: datos_resena.usuarioId,
            calificacion: datos_resena.calificacion,
            comentario: datos_resena.comentario
        };

        return await obtenerBD().collection(COLECCION_RESENAS_PLATOS).insertOne(nuevaResena);

    } catch (error) {
        throw new Error("Error al agregar la reseña de plato: " + error.message);
    }
}

export async function eliminarResenaPlato(id) {
    try {
        if (!id) {
            throw new Error("El ID de la reseña es obligatorio para eliminar.");
        }

        return await obtenerBD().collection(COLECCION_RESENAS_PLATOS).deleteOne({ id: id });
    } catch (error) {
        throw new Error("Error al eliminar la reseña de plato: " + error.message);
    }
}

export async function obtenerResenasPlatoPorId(platoId) {
    try {
        const platoExistente = await obtenerBD().collection(COLECCION_PLATOS).findOne({ id: platoId });

        if (!platoExistente) {
            throw new Error("Plato no encontrado");
        }

        return await obtenerBD().collection(COLECCION_RESENAS_PLATOS).find({ platoId: platoId }).toArray();

    } catch (error) {
        throw new Error("Error al obtener las reseñas del plato: " + error.message);
    }
}

