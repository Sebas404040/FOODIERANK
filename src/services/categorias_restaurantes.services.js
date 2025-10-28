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

export async function crearCategoriaRestaurante(categoria) {
    try {
        return await obtenerBD().collection(COLECCION_CATEGORIAS_RESTAURANTES).insertOne(categoria);
    } catch (error) {
        throw new Error("Error al crear la categoría de restaurante: " + error.message);
    }
}

export async function eliminarCategoriaRestaurante(id) {
    try {
        return await obtenerBD().collection(COLECCION_CATEGORIAS_RESTAURANTES).deleteOne({ id: id });
    } catch (error) {
        throw new Error("Error al eliminar la categoría de restaurante: " + error.message);
    }
}

export async function actualizarCategoriaRestaurante(id_restaurante, id_categoriaActualizada) {
    try {
        return await obtenerBD().collection(COLECCION_RESTAURANTES).updateOne(
            { id: id_restaurante },
            { $set: { categoriaId: id_categoriaActualizada } }
        );
    } catch (error) {
        throw new Error("Error al actualizar la categoría del restaurante: " + error.message);
    }
}

