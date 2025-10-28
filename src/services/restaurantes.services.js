import { obtenerBD } from "../config/db.js";

const COLECCION_RESTAURANTES = "restaurantes";

export async function obtenerRestaurantes() {
    try {
        return await obtenerBD().collection(COLECCION_RESTAURANTES).find().toArray();
    } catch (error) {
        throw new Error("Error al obtener los restaurantes: " + error.message);
    }
}

export async function crearRestaurante(datos) {
    try {

        const { nombre, categoriaId, direccion, imagen_url, descripcion } = datos;

        if (!nombre || !categoriaId || !direccion || !imagen_url || !descripcion) {
            throw new Error("Todos los campos son obligatorios");
        }

        const restauranteExistente = await obtenerBD().collection(COLECCION_RESTAURANTES).findOne({ nombre: nombre });

        if (restauranteExistente) {
            throw new Error("El restaurante ya existe");
        }

        const ultimoRestaurante = await obtenerBD().collection(COLECCION_RESTAURANTES).findOne({}, { sort: { id: -1 } });

        const nuevoId = ultimoRestaurante ? ultimoRestaurante.id + 1 : 1;

        const nuevoRestaurante = {
            id: nuevoId,
            nombre,
            categoriaId,
            direccion,
            imagen_url,
            descripcion
        };

        return await obtenerBD().collection(COLECCION_RESTAURANTES).insertOne(nuevoRestaurante);

    } catch (error) {
        throw new Error("Error al crear el restaurante: " + error.message);
    }
}

export async function eliminarRestaurante(id) {
    try {
        const restaurante = await obtenerBD().collection(COLECCION_RESTAURANTES).findOne({ id: id });
        if (!restaurante) {
            throw new Error("Restaurante no encontrado");
        }

        return await obtenerBD().collection(COLECCION_RESTAURANTES).deleteOne({ id: id });

    } catch (error) {
        throw new Error("Error al eliminar el restaurante: " + error.message);
    }
}

export async function actualizarRestaurante(id_restaurante, datosActualizados) {

    try {
        const { nombre, categoriaId, direccion, imagen_url, descripcion } = datosActualizados;

        const resultado = await obtenerBD().collection(COLECCION_RESTAURANTES).updateOne(
            { id: id_restaurante },
            { $set: { nombre, categoriaId, direccion, imagen_url, descripcion } }
        );
        if (resultado.matchedCount === 0) {
            throw new Error("Restaurante no encontrado");
        }

    } catch (error) {
        throw new Error("Error al actualizar el restaurante: " + error.message);
    }
}
