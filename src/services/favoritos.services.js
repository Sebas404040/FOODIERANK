import { obtenerBD } from "../config/db.js";

const COLECCION_FAVORITOS="favoritos";
const COLECCION_RESTAURANTES="restaurantes";


export async function verfavoritos() {
    try {
        const resultado = await obtenerBD().collection(COLECCION_FAVORITOS).find({}).toArray();;
        return resultado;
    } catch (error) {
        throw new Error("Error al ver favoritos: " + error.message);
    }
}

export async function eliminar(usuarioId, restauranteId) {
    try {
        
        const favoritoExistente = await obtenerBD().collection(COLECCION_FAVORITOS).findOne({ usuarioId: usuarioId, restauranteId: restauranteId });

        if (!favoritoExistente) {
            throw new Error("Este restaurante no esta en favoritos");
        }



        const resultado = await obtenerBD().collection(COLECCION_FAVORITOS).deleteOne({ usuarioId: usuarioId, restauranteId: restauranteId });

        return { mensaje: "Restaurante eliminado"};

    } catch (error) {
        throw new Error("Error al ver favoritos: " + error.message);
    }
}

export async function agregarFavorito(usuarioId, restauranteId) {
    try {
        const restaurante = await obtenerBD().collection(COLECCION_RESTAURANTES).findOne({ id: restauranteId });

        if (!restaurante) {
            throw new Error("Restaurante no encontrado");
        }

        const favoritoExistente = await obtenerBD().collection(COLECCION_FAVORITOS).findOne({ usuarioId: usuarioId, restauranteId: restauranteId });

        if (favoritoExistente) {
            throw new Error("Este restaurante ya está en tus favoritos");
        }

        const ultimoFavorito = await obtenerBD().collection(COLECCION_FAVORITOS).findOne({}, { sort: { id: -1 } });

        const nuevoId = ultimoFavorito ? ultimoFavorito.id + 1 : 1;

        const nuevoFavorito = {
            id: nuevoId,
            usuarioId: usuarioId,
            restauranteId: restauranteId
        };

        const resultado = await obtenerBD().collection(COLECCION_FAVORITOS).insertOne(nuevoFavorito);

        return { mensaje: "Restaurante agregado a favoritos"};

    } catch (error) {
        throw new Error("Error al agregar favorito: " + error.message);
    }
}

export async function obtenerFavoritosUsuario(id) {
    try {
        const favoritos = await obtenerBD()
            .collection(COLECCION_FAVORITOS)
            .aggregate([
                {
                    $match: { usuarioId: id }
                },
                {
                    $lookup: {
                        from: "restaurantes",
                        localField: "restauranteId",
                        foreignField: "id",
                        as: "restaurante"
                    }
                },
                {
                    $unwind: "$restaurante"
                },
                {
                    $project: {
                        _id: 0,
                        id: "$id",
                        fechaAgregado: "$fechaAgregado",
                        notas: "$notas",
                        restaurante: {
                            id: "$restaurante.id",
                            nombre: "$restaurante.nombre"
                        }
                    }
                }
            ])
            .toArray();

        return favoritos;

    } catch (error) {
        throw new Error("Error al obtener favoritos: " + error.message);
    }
}
