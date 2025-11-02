import jwt from "jsonwebtoken";
import { obtenerBD } from "../config/db.js";
import { ObjectId } from "mongodb";

export async function autenticacionMidleware(req, res, next) {
    try {
        const token = req.signedCookies.token; 

        if (!token) {
            return res.status(401).json({ mensaje: "No autorizado. No se proporcionó token." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const usuario = await obtenerBD().collection("usuarios").findOne({ _id: new ObjectId(decoded.id) });

        if (!usuario) {
            return res.status(401).json({ mensaje: "No autorizado. Usuario no encontrado." });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: "No autorizado. Token inválido o expirado." });
    }
}