import { registrarUsuario as registrarUsuarioService, iniciarSesion as iniciarSesionService } from "../services/authentication.services.js";

export async function registrarUsuario_controller(req, res, next) {
    try {
        const { token, ...usuario } = await registrarUsuarioService(req.body);

        res.cookie('token', token, {
            httpOnly: true, // La cookie no es accesible por JavaScript
            secure: process.env.NODE_ENV === 'production', // Solo enviar en HTTPS en producción
            sameSite: 'strict', // Mitiga ataques CSRF
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 días
        });

        res.status(201).json({
            mensaje: "Registro exitoso",
            usuario
        });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function iniciarSesion_controller(req, res, next) {
    try {
        const { token, ...usuario } = await iniciarSesionService(req.body);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 días
        });

        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            usuario
        });
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}
