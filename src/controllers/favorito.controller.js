import {
    agregarFavorito, obtenerFavoritosUsuario, verfavoritos, eliminar
} from "../services/favoritos.services.js";

export async function postFavorito(req, res) {
    try {
        const restauranteId = req.body.restauranteId;
        const usuarioId = req.body.usuarioId;

        const resultado = await agregarFavorito(usuarioId, restauranteId);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function deleteFavorito(req, res) {
    try {
        const restauranteId = req.body.restauranteId;
        const usuarioId = req.body.usuarioId;

        const resultado = await eliminar(usuarioId, restauranteId);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function getFavoritostodos(req, res) {
    try {
        const resultado = await verfavoritos();
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: "hola" + error.message });
    }
}

export async function getFavoritos(req, res) {
    try {
        const id = parseInt(req.params.id);
        const favoritos = await obtenerFavoritosUsuario(id);
        res.status(200).json(favoritos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}


