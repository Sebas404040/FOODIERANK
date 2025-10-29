import { obtenerBD } from "../config/db.js";

const COLECCION_RESENAS_RESTAURANTES = "resenas_restaurantes";
const COLECCION_RESTAURANTES = "restaurantes";

export async function obtenerResenasRestaurantes() {
    try {
        return await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).find().toArray();
    } catch (error) {
        throw new Error("Error al obtener las reseñas de restaurantes: " + error.message);
    }
}

export async function agregarResenaRestaurante(datos_resena) {
    try {
        const { restauranteId, usuarioId, calificacion, comentario } = datos_resena;

        if (!restauranteId || !usuarioId || !calificacion || !comentario) {
            throw new Error("Faltan datos obligatorios para agregar la reseña de restaurante.");
        }

        const ultimoIdResena = await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).find().sort({ id: -1 }).limit(1).toArray();
        const nuevoId = ultimoIdResena.length > 0 ? ultimoIdResena[0].id + 1 : 1;

        const nuevaResena = {
            id: nuevoId,
            restauranteId: datos_resena.restauranteId, 
            usuarioId: datos_resena.usuarioId,
            calificacion: datos_resena.calificacion,
            comentario: datos_resena.comentario
        };

        return await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).insertOne(nuevaResena);

    } catch (error) {
        throw new Error("Error al agregar la reseña de restaurante: " + error.message);
    }
}

export async function eliminarResenaRestaurante(id) {
    try {
        if (!id) {
            throw new Error("El ID de la reseña es obligatorio para eliminar.");
        }
    
        return await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).deleteOne({ id: parseInt(id) });
    } catch (error) {
        throw new Error("Error al eliminar la reseña de restaurante: " + error.message);
    }
}

export async function obtenerResenasRestaurantePorId(restauranteId) {
    try {
        const restauranteExistente = await obtenerBD().collection(COLECCION_RESTAURANTES).findOne({ id: restauranteId });

        if (!restauranteExistente) {
            throw new Error("Restaurante no encontrado");
        }

        return await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).find({ restauranteId: restauranteId }).toArray();

    } catch (error) {
        throw new Error("Error al obtener las reseñas del restaurante: " + error.message);
    }
}

export async function darLikeResenaRestaurante(id, id_usuario) {
    try {
        if (!id || !id_usuario) {
            throw new Error("El ID de la reseña y el ID del usuario son obligatorios para dar like.");
        } 
        const resena = await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).findOne({ id: id });
        if (!resena) {
            throw new Error("Reseña no encontrada.");
        }
        
        if (resena.usuarioId === id_usuario) {
            throw new Error("No puedes dar like a tu propia reseña.");
        }

        const updateResult = await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).updateOne(
            { id: id },
            { $inc: { likes: 1 } }
        );
        return updateResult;
    } catch (error) {
        throw new Error("Error al dar like a la reseña de restaurante: " + error.message);
    }
}

