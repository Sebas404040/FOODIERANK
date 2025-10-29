import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getDB } from "../config/db.js";

dotenv.config();

function generarToken(id){
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_TOKEN});
}

const usuarios = ()=> getDB().collection("usuarios");

export async function registrarUsuario({username, password, role, correo, telefono}) {
    const usuarioExistente = await usuarios().findOne({email});
    if(usuarioExistente) throw new Error("Usuario ya existe!!");

    const contraCifrada = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    const usuario = {
        username,
        password: contraCifrada,
        role,
        correo,
        telefono
    }

    const resultado = await usuarios().insertOne(usuario);

    const token = generarToken(resultado.insertedId);

    return {id: resultado.insertedId, username, email, token};
}

export async function iniciarSesion({email, password}) {
    const usuarioExistente = await usuarios().findOne({email});
    if (!usuarioExistente) throw new Error("El usuario no existe!!"); 

    const validacion = await bcrypt.compare(password, usuarioExistente.password);
    if(!validacion) throw new Error("Contraseña es incorrecta");

    const token = generarToken(usuarioExistente._id);
    return {id: usuarioExistente._id, 
        username: usuarioExistente.username, 
        email: usuarioExistente.email, 
        token
    };
}