import { obtenerBD } from "../config/db.js";

const COLECCION_RESENAS_RESTAURANTES = "resenas_restaurantes";
const COLECCION_RESTAURANTES = "restaurantes";
const COLECCION_USUARIOS = "usuarios"

export async function obtenerResenasRestaurantes() {
    try {
        return await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).find().toArray();
    } catch (error) {
        throw new Error("Error al obtener las reseñas de restaurantes: " + error.message);
    }
}

export async function agregarResenaRestaurante(datos_resena) {
    try {
        const { restauranteId, usuarioId, calificacion, comentario, fecha, likes } = datos_resena;

        if (!restauranteId || !usuarioId || !calificacion || !comentario || fecha === undefined || likes === undefined) {
            throw new Error("Faltan datos obligatorios para agregar la reseña de restaurante.");
        }

        const ultimoIdResena = await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).find().sort({ id: -1 }).limit(1).toArray();
        const nuevoId = ultimoIdResena.length > 0 ? ultimoIdResena[0].id + 1 : 1;

        const nuevaResena = {
            id: nuevoId,
            restauranteId: restauranteId, 
            usuarioId: usuarioId,
            calificacion: calificacion,
            comentario: comentario,
            fecha: new Date(fecha),
            likes: likes
        };


        const notificacion = {
            id_restaurante: restauranteId,
            visto: false
        }

        const resultado = await obtenerBD().collection(COLECCION_USUARIOS).updateOne({id: usuarioId}, {notificacion})
        return await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).insertOne(nuevaResena), resultado;

    } catch (error) {
        console.error("Error detallado en agregarResenaRestaurante:", error);
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
            throw new Error("El ID de la reseña y el ID del usuario son obligatorios.");
        }

        const resena = await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).findOne({ id: parseInt(id) });
        if (!resena) {
            throw new Error("Reseña no encontrada.");
        }

        if (resena.usuarioId === id_usuario) {
            throw new Error("No puedes dar like a tu propia reseña.");
        }

        const verificacionLike = resena.likedBy && resena.likedBy.includes(id_usuario);

        let updateOperation;
        if (verificacionLike) {
            updateOperation = {
                $inc: { likes: -1 },
                $pull: { likedBy: id_usuario }
            };
        } else {
            updateOperation = {
                $inc: { likes: 1 },
                $addToSet: { likedBy: id_usuario } 
            };
        }

        const updateResult = await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).updateOne(
            { id: parseInt(id) },
            updateOperation
        );

        const resenaActualizada = await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).findOne({ id: parseInt(id) });
        
        return {
            likes: resenaActualizada.likes,
            likedByUser: !verificacionLike 
        };

    } catch (error) {
        throw new Error("Error al procesar el like de la reseña: " + error.message);
    }
}

export async function actualizarResenaRestaurante(id, datosActualizados) {
    try {
        const { calificacion, comentario } = datosActualizados;
        if (!calificacion && !comentario) {
            throw new Error("No se proporcionaron datos para actualizar.");
        }

        const resultado = await obtenerBD().collection(COLECCION_RESENAS_RESTAURANTES).updateOne(
            { id: id },
            { $set: datosActualizados }
        );

        if (resultado.matchedCount === 0) throw new Error("Reseña no encontrada.");
    } catch (error) {
        throw new Error("Error al actualizar la reseña de restaurante: " + error.message);
    }
}

export async function cambiarVisto(id) {
    try {
        if (!id || !id_usuario) {
            throw new Error("El ID de la notificacion es obligatoria.");
        }
        
        const resultado = await obtenerBD().collection(COLECCION_RESTAURANTES).updateOne(
            {id: id},
            {$set: visto}
        )
    } catch (error) {
        
    }
}
