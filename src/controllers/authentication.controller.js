import { registrarUsuario as registrarUsuarioService, iniciarSesion as iniciarSesionService } from "../services/authentication.services.js";

export async function registrarUsuario_controller(req, res, next) {
    try {
        const resultado = await registrarUsuarioService(req.body);
        res.status(201).json(resultado)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function iniciarSesion_controller(req, res, next) {
    try {
        const resultado = await iniciarSesionService(req.body);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}
