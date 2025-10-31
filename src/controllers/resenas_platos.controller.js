import {
    obtenerResenasPlatos,
    agregarResenaPlato,
    eliminarResenaPlato,
    obtenerResenasPlatoPorId,
    darLikeResenaPlato,
    actualizarResenaPlato
} from "../services/resenas_platos.services.js";

export async function getResenasPlatos(req, res) {
    try {
        const resenas = await obtenerResenasPlatos();
        res.status(200).json(resenas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function postResenaPlato(req, res) {
    try {
        const datosResena = req.body;
        const resultado = await agregarResenaPlato(datosResena);
        res.status(201).json({ mensaje: "Reseña de plato agregada exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function deleteResenaPlato(req, res) {
    try {
        const id  = parseInt(req.params.id);
        const resultado = await eliminarResenaPlato(id);
        res.status(200).json({ mensaje: "Reseña de plato eliminada exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function getResenasPlatoPorId(req, res) {
    try {
        const platoId = parseInt(req.params.id);
        const resenas = await obtenerResenasPlatoPorId(platoId);
        res.status(200).json(resenas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function putLikeResenaPlato(req, res) {
    try {
        const id = parseInt(req.params.id);
        const id_usuario = req.body.id_usuario;
        const resultado = await darLikeResenaPlato(id, id_usuario);
        res.status(200).json({ mensaje: "Like agregado a la reseña de plato exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function patchEditresenaPlato(req, res) {
    try {
        const id = parseInt(req.params.id);
        const datosResena = req.body;
        const resultado = await actualizarResenaPlato(id, datosResena);
        res.status(200).json({ mensaje: "Reseña de plato editada exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}
