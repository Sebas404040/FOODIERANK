import { obtenerBD } from "../config/db.js";

const COLECCION_USUARIOS = "usuarios";

export async function crearUsuario(datosUsuario) {
    try {
        const bd = obtenerBD();

        const {username, password, role, correo, telefono} = datosUsuario;

        if (!username || !password || !role || !correo || !telefono) {
            throw new Error("Todos los campos son obligatorios");
        }

        const usuarioExistente = await bd.collection(COLECCION_USUARIOS).findOne({ username: datosUsuario.username});

        if (usuarioExistente) {
            throw new Error("El nombre de usuario ya existe");
        }

        const ultimoUsuario = await bd.collection(COLECCION_USUARIOS).findOne({}, { sort: { id: -1 } });

        const nuevoId = ultimoUsuario ? ultimoUsuario.id + 1 : 1;

        const nuevoUsuario = {
            id: nuevoId,
            username: datosUsuario.username,
            password: datosUsuario.password,
            role: datosUsuario.role,
            correo: datosUsuario.correo,
            telefono: datosUsuario.telefono
        };

        await bd.collection(COLECCION_USUARIOS).insertOne(nuevoUsuario);

        return { message: `Usuario ${nuevoUsuario.username} creado` }
    } catch (error) {
        throw new Error(`Error al crear usuario: ${error.message}`);
    }
}

export async function obtenerUsuarios() {
    try {
        const bd = obtenerBD();
        return await bd.collection(COLECCION_USUARIOS).find().toArray();
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
}

export async function obtenerUsuarioPorId(id) {
    try {
        const bd = obtenerBD();
        return await bd.collection(COLECCION_USUARIOS).findOne({ id: id });
    } catch (error) {
        throw new Error(`Error al obtener usuario: ${error.message}`);
    }
}

export async function eliminarUsuario(id) {
    try {
        const bd = obtenerBD();
        const resultado = await bd.collection(COLECCION_USUARIOS).deleteOne({ id: id });
        if (resultado.deletedCount === 0) {
            throw new Error("Usuario no encontrado");
        }
        return { message: `Usuario con ID ${id} eliminado` };
    } catch (error) {
        throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
}
