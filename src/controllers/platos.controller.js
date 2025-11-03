import {
    obtenerPlatos,
    crearPlato,
    eliminarPlato,
    actualizarPlato,
    obtenerPlatoPorId
} from "../services/platos.services.js";

export async function getPlatos(req, res) {
    try {
        const platos = await obtenerPlatos();
        res.status(200).json(platos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function postPlato(req, res) {
    try {
        const datosPlato = req.body;
        // Las conversiones de tipo y validaciones ya son manejadas por el DTO y el middleware.
        const resultado = await crearPlato(datosPlato);
        res.status(201).json({ mensaje: "Plato creado exitosamente", resultado });
    } catch (error) {
        const status = error.message.includes("obligatorios") || error.message.includes("existe") ? 400 : 500;
        res.status(status).json({ mensaje: error.message });
    }
}

export async function deletePlato(req, res) {
    try {
        const id  = parseInt(req.params.id);
        const resultado = await eliminarPlato(id);
        res.status(200).json({ mensaje: "Plato eliminado exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function patchPlato(req, res) {
    try {
        const id_plato = parseInt(req.params.id);
        const datosActualizados = req.body;
        const resultado = await actualizarPlato(id_plato, datosActualizados);
        res.status(200).json({ mensaje: "Plato actualizado exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function getPlatoPorId(req, res) {
    try {
        const id = parseInt(req.params.id);

        const plato = await obtenerPlatoPorId(id);
        
        res.cookie('last_viewed_dish', id, {
            httpOnly: false, 
            signed: true, 
            maxAge: 30 * 24 * 60 * 60 * 1000, 
            secure: process.env.NODE_ENV === 'production' 
        });

        res.status(200).json(plato);
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
}