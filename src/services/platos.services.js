import { obtenerBD } from "../config/db.js";

const COLECCION_PLATOS = "platos";

export async function obtenerPlatos() {
    try {
        return await obtenerBD().collection(COLECCION_PLATOS).find().toArray();
    } catch (error) {
        throw new Error("Error al obtener los platos: " + error.message);
    }
}

export async function crearPlato(datos) {
    try {

        const { nombre, categoriaId, descripcion, imagen_url, precio, id_restaurante } = datos;

        if (!nombre || !categoriaId || !descripcion || !imagen_url || !precio || !id_restaurante) {
            throw new Error("Todos los campos son obligatorios");
        }

        const platoExistente = await obtenerBD().collection(COLECCION_PLATOS).findOne({ nombre: nombre });

        if (platoExistente) {
            throw new Error("El plato ya existe");
        }

        const ultimoPlato = await obtenerBD().collection(COLECCION_PLATOS).findOne({}, { sort: { id: -1 } });

        const nuevoId = ultimoPlato ? ultimoPlato.id + 1 : 1;

        const nuevoPlato = {
            id: nuevoId,
            nombre,
            categoriaId,
            descripcion,
            imagen_url,
            precio,
            id_restaurante
        };

        return await obtenerBD().collection(COLECCION_PLATOS).insertOne(nuevoPlato);

    } catch (error) {
        throw new Error("Error al crear el plato: " + error.message);
    }
}

export async function eliminarPlato(id) {
    try {
        const plato = await obtenerBD().collection(COLECCION_PLATOS).findOne({ id: id });
        if (!plato) {
            throw new Error("Plato no encontrado");
        }

        return await obtenerBD().collection(COLECCION_PLATOS).deleteOne({ id: id });

    } catch (error) {
        throw new Error("Error al eliminar el plato: " + error.message);
    }
}

export async function actualizarPlato(id_plato, datosActualizados) {

    try {
        const { nombre, categoriaId, descripcion, imagen_url, precio, id_restaurante } = datosActualizados;

        const resultado = await obtenerBD().collection(COLECCION_PLATOS).updateOne(
            { id: id_plato },
            { $set: { nombre, categoriaId, descripcion, imagen_url, precio, id_restaurante } }
        );
        if (resultado.matchedCount === 0) {
            throw new Error("Plato no encontrado");
        }

    } catch (error) {
        throw new Error("Error al actualizar el plato: " + error.message);
    }
}
