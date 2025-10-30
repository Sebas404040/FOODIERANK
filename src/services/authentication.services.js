import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { obtenerBD } from "../config/db.js";

function generarToken(id){
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_TOKEN});
}

const usuarios = ()=> obtenerBD().collection("usuarios");

export async function registrarUsuario({username, password, role, email, telefono}) {
    const correo = email; // Asignamos el valor de email a correo
    const usuarioExistente = await usuarios().findOne({correo});
    if(usuarioExistente) throw new Error("El correo ya está registrado!!");

    const contraCifrada = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    const ultimoUsuario = await usuarios().findOne({}, { sort: { id: -1 } });
    const nuevoId = ultimoUsuario ? ultimoUsuario.id + 1 : 1;

    const usuario = {
        id: nuevoId,
        username,
        password: contraCifrada,
        role,
        correo,
        telefono
    }

    const resultado = await usuarios().insertOne(usuario);

    const token = generarToken(resultado.insertedId);

    return {id: resultado.insertedId, username, correo, token};
}

export async function iniciarSesion({correo, password}) {
    const usuarioExistente = await usuarios().findOne({correo});
    if (!usuarioExistente) throw new Error("El usuario no existe!!"); 

    const validacion = await bcrypt.compare(password, usuarioExistente.password);
    if(!validacion) throw new Error("Contraseña es incorrecta");

    const token = generarToken(usuarioExistente._id);
    return {id: usuarioExistente._id, 
        username: usuarioExistente.username, 
        correo: usuarioExistente.correo, 
        token
    };
}