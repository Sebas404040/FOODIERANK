import { obtenerBD } from "../config/db.js";

const COLECCION_CATEGORIAS_RESTAURANTES = "categorias_restaurantes";
const COLECCION_RESTAURANTES = "restaurantes";

export async function obtenerCategoriasRestaurantes() {
    try {
        return await obtenerBD().collection(COLECCION_CATEGORIAS_RESTAURANTES).find().toArray();
    } catch (error) {
        throw new Error("Error al obtener las categorías de restaurantes: " + error.message);
    }
}

export async function obtenerCategoriaRestaurantePorId(id) {
    try {
        const categoria = await obtenerBD().collection(COLECCION_CATEGORIAS_RESTAURANTES).findOne({ id: id });
        return categoria;
    } catch (error) {
        throw new Error("Error al obtener la categoría de restaurante por ID: " + error.message);
    }
}

export async function crearCategoriaRestaurante(categoria) {
    try {

        if (!categoria) {
            throw new Error("El nombre de la categoría es obligatorio");
        }

        const categoriaExistente = await obtenerBD().collection(COLECCION_CATEGORIAS_RESTAURANTES).findOne({ nombre: categoria });

        if (categoriaExistente) {
            throw new Error("La categoría de restaurante ya existe");
        }

        const ultimoCategoria = await obtenerBD().collection(COLECCION_CATEGORIAS_RESTAURANTES).findOne({}, { sort: { id: -1 } });

        const nuevoId = ultimoCategoria ? ultimoCategoria.id + 1 : 1;

        return await obtenerBD().collection(COLECCION_CATEGORIAS_RESTAURANTES).insertOne({ id: nuevoId, nombre: categoria });

    } catch (error) {
        throw new Error("Error al crear la categoría de restaurante: " + error.message);
    }
}

export async function eliminarCategoriaRestaurante(id) {
    try {
        const categoria = await obtenerBD().collection(COLECCION_CATEGORIAS_RESTAURANTES).findOne({ id: id });
        if (!categoria) {
            throw new Error("Categoría de restaurante no encontrada");
        }
        return await obtenerBD().collection(COLECCION_CATEGORIAS_RESTAURANTES).deleteOne({ id: id });
    } catch (error) {
        throw new Error("Error al eliminar la categoría de restaurante: " + error.message);
    }
}

export async function actualizarCategoriaRestaurante(id_restaurante, id_categoriaActualizada) {
    try {
        const restaurante = await obtenerBD().collection(COLECCION_RESTAURANTES).findOne({ id: id_restaurante });
        const categoria = await obtenerBD().collection(COLECCION_CATEGORIAS_RESTAURANTES).findOne({ id: id_categoriaActualizada });

        if (!restaurante) {
            throw new Error("Restaurante no encontrado");
        }

        if (!categoria) {
            throw new Error("Categoría de restaurante no encontrada");
        }
        
        return await obtenerBD().collection(COLECCION_RESTAURANTES).updateOne(
            { id: id_restaurante },
            { $set: { categoriaId: id_categoriaActualizada } }
        );
    } catch (error) {
        throw new Error("Error al actualizar la categoría del restaurante: " + error.message);
    }
}

