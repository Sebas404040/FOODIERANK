import {
    obtenerRestaurantes,
    crearRestaurante,
    eliminarRestaurante,
    actualizarRestaurante,
    obtenerRestaurantePorId
} from '../services/restaurantes.services.js';

export async function getRestaurantes(req, res) {
    try {
        const restaurantes = await obtenerRestaurantes();
        res.status(200).json(restaurantes);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function postRestaurante(req, res) {
    try {
        const datosRestaurante = req.body;
        const resultado = await crearRestaurante(datosRestaurante);
        res.status(201).json({ mensaje: "Restaurante creado exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function deleteRestaurante(req, res) {
    try {
        const id  = parseInt(req.params.id);
        const resultado = await eliminarRestaurante(id);
        res.status(200).json({ mensaje: "Restaurante eliminado exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function patchRestaurante(req, res) {
    try {
        const id_restaurante = parseInt(req.params.id);
        const datosActualizados = req.body;
        const resultado = await actualizarRestaurante(id_restaurante, datosActualizados);
        res.status(200).json({ mensaje: "Restaurante actualizado exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function getRestaurantePorId(req, res) {
    try {
        const id = parseInt(req.params.id);

        const restaurante = await obtenerRestaurantePorId(id);
        
        res.cookie('last_viewed_restaurant', id, {
            httpOnly: false, 
            signed: true, 
            maxAge: 30 * 24 * 60 * 60 * 1000, 
            secure: process.env.NODE_ENV === 'production' 
        });

        res.status(200).json(restaurante);
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
}