import { registrarUsuario, iniciarSesion } from '../services/authentication.service.js';

export async function registrar(req, res, next) {
    try {
        const resultado = await registrarUsuario(req.body);
        res.status(201).json(resultado)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function iniciar(req, res, next) {
    try {
        const resultado = await iniciarSesion(req.body);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

