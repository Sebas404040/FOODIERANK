import {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    eliminarUsuario
} from '../services/usuarios.services.js';

export async function getUsuarios(req, res) {
    try {
        const usuarios = await obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function getUsuarioPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const usuario = await obtenerUsuarioPorId(id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function postUsuario(req, res) {
    try {
        const datosUsuario = req.body;
        const resultado = await crearUsuario(datosUsuario);
        res.status(201).json({ mensaje: "Usuario creado exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function deleteUsuario(req, res) {
    try {
        const id  = parseInt(req.params.id);
        const resultado = await eliminarUsuario(id);
        res.status(200).json({ mensaje: "Usuario eliminado exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}