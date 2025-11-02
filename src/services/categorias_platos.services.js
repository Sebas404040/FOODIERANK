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

export async function obtenerCategoriaPlatoPorId(id) {
    try {
        const categoria = await obtenerBD().collection(COLECCION_CATEGORIAS_PLATOS).findOne({ id: id });
        return categoria;
    } catch (error) {
        throw new Error("Error al obtener la categoría de plato por ID: " + error.message);
    }
}

export async function crearCategoriaPlato(categoria) {
    try {

        if(!categoria) {
            throw new Error("El nombre de la categoría es obligatorio");
        }

        const categoriaExistente = await obtenerBD().collection(COLECCION_CATEGORIAS_PLATOS).findOne({ nombre: categoria });

        if (categoriaExistente) {
            throw new Error("La categoría de plato ya existe");
        }

        const ultimoCategoria = await obtenerBD().collection(COLECCION_CATEGORIAS_PLATOS).findOne({}, { sort: { id: -1 } });

        const nuevoId = ultimoCategoria ? ultimoCategoria.id + 1 : 1;

        return await obtenerBD().collection(COLECCION_CATEGORIAS_PLATOS).insertOne({ id: nuevoId, nombre: categoria });

    } catch (error) {
        throw new Error("Error al crear la categoría de plato: " + error.message);
    }
}

export async function eliminarCategoriaPlato(id) {
    try {
        const categoria = await obtenerBD().collection(COLECCION_CATEGORIAS_PLATOS).findOne({ id: id });

        if (!categoria) {
            throw new Error("Categoría de plato no encontrada");
        }

        return await obtenerBD().collection(COLECCION_CATEGORIAS_PLATOS).deleteOne({ id: id });

    } catch (error) {
        throw new Error("Error al eliminar la categoría de plato: " + error.message);
    }
}

export async function actualizarCategoriaPlato(id_plato, id_categoriaActualizada) {
    try {

        const plato = await obtenerBD().collection(COLECCION_PLATOS).findOne({ id: id_plato });
        const categoria = await obtenerBD().collection(COLECCION_CATEGORIAS_PLATOS).findOne({ id: id_categoriaActualizada });

        if (!plato) {
            throw new Error("Plato no encontrado");
        }

        if (!categoria) {
            throw new Error("Categoría de plato no encontrada");
        }

        return await obtenerBD().collection(COLECCION_PLATOS).updateOne(
            { id: id_plato },
            { $set: { categoriaId: id_categoriaActualizada } }
        );
        
    } catch (error) {
        throw new Error("Error al actualizar la categoría del plato: " + error.message);
    }
}

