import { obtenerBD } from "../config/db.js";

const COLECCION_CATEGORIAS_PLATOS = "categorias_platos";
const COLECCION_PLATOS = "platos";

export async function obtenerCategoriasPlatos() {
    try {
    return await obtenerBD().collection(COLECCION_CATEGORIAS_PLATOS).find().toArray();
    } catch (error) {
        throw new Error("Error al obtener las categorías de platos: " + error.message);
    }
}

export async function crearCategoriaPlato(categoria) {
    try {
        return await obtenerBD().collection(COLECCION_CATEGORIAS_PLATOS).insertOne(categoria);
    } catch (error) {
        throw new Error("Error al crear la categoría de plato: " + error.message);
    }
}

export async function eliminarCategoriaPlato(id) {
    try {
        return await obtenerBD().collection(COLECCION_CATEGORIAS_PLATOS).deleteOne({ id: id });
    } catch (error) {
        throw new Error("Error al eliminar la categoría de plato: " + error.message);
    }
}

export async function actualizarCategoriaPlato(id_plato, id_categoriaActualizada) {
    try {
        return await obtenerBD().collection(COLECCION_PLATOS).updateOne(
            { id: id_plato },
            { $set: { categoriaId: id_categoriaActualizada } }
        );
    } catch (error) {
        throw new Error("Error al actualizar la categoría del plato: " + error.message);
    }
}

