import {
    obtenerResenasRestaurantes,
    agregarResenaRestaurante,
    eliminarResenaRestaurante,
    obtenerResenasRestaurantePorId,
    darLikeResenaRestaurante,
    actualizarResenaRestaurante
} from "../services/resenas_restaurantes.services.js";

export async function getResenasRestaurantes(req, res) {
    try {
        const resenas = await obtenerResenasRestaurantes();
        res.status(200).json(resenas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function patchResenaRestaurante(req, res) {
    try {
        const id = parseInt(req.params.id);
        const datosActualizados = req.body;
        await actualizarResenaRestaurante(id, datosActualizados);
        res.status(200).json({ mensaje: "Reseña de restaurante actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function postResenaRestaurante(req, res) {
    try {
        const datosResena = req.body;
        const resultado = await agregarResenaRestaurante(datosResena);
        res.status(201).json({ mensaje: "Reseña de restaurante agregada exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function deleteResenaRestaurante(req, res) {
    try {
        const id  = parseInt(req.params.id);
        const resultado = await eliminarResenaRestaurante(id);
        res.status(200).json({ mensaje: "Reseña de restaurante eliminada exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function getResenasRestaurantePorId(req, res) {
    try {
        const restauranteId = parseInt(req.params.id);
        const resenas = await obtenerResenasRestaurantePorId(restauranteId);
        res.status(200).json(resenas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function putLikeResenaPlato(req, res) {
    try {
        const id = parseInt(req.params.id);
        const id_usuario = req.body.id_usuario;
        const resultado = await darLikeResenaRestaurante(id, id_usuario);
        res.status(200).json({ mensaje: "Like agregado a la reseña de restaurante exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}
