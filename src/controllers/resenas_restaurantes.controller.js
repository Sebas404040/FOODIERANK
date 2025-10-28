import {
    obtenerResenasRestaurantes,
    agregarResenaRestaurante,
    eliminarResenaRestaurante,
    obtenerResenasRestaurantePorId
} from "../services/resenas_restaurantes.services.js";

export async function getResenasRestaurantes(req, res) {
    try {
        const resenas = await obtenerResenasRestaurantes();
        res.status(200).json(resenas);
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
