import {
    obtenerPlatos,
    crearPlato,
    eliminarPlato,
    actualizarPlato
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
        const resultado = await crearPlato(datosPlato);
        res.status(201).json({ mensaje: "Plato creado exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
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

