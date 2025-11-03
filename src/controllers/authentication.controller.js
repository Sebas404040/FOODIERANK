import { registrarUsuario as registrarUsuarioService, iniciarSesion as iniciarSesionService } from "../services/authentication.services.js";

export async function registrarUsuario_controller(req, res, next) {
    try {
        const { token, ...usuario } = await registrarUsuarioService(req.body);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 1000 * 60 * 60 * 24 * 30, 
            path: '/',
            signed: true,
            domain: (process.env.NODE_ENV !== 'production' && req.hostname === '127.0.0.1') ? '127.0.0.1' : undefined // Asegura el dominio correcto en desarrollo
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
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/',
            signed: true,
            domain: (process.env.NODE_ENV !== 'production' && req.hostname === '127.0.0.1') ? '127.0.0.1' : undefined 
        });

        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            usuario
        });
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}
