import {
    obtenerCategoriasRestaurantes,
    crearCategoriaRestaurante,
    eliminarCategoriaRestaurante,
    actualizarCategoriaRestaurante
} from "../services/categorias_restaurantes.services.js";

export async function getCategoriasRestaurantes(req, res) {
    try {
        const categorias = await obtenerCategoriasRestaurantes();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function postCategoriaRestaurante(req, res) {
    try {
        const { nombre } = req.body;
        const resultado = await crearCategoriaRestaurante(nombre);
        res.status(201).json({ mensaje: "Categoría de restaurante creada exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function deleteCategoriaRestaurante(req, res) {
    try {
        const id  = parseInt(req.params.id);
        const resultado = await eliminarCategoriaRestaurante(id);
        res.status(200).json({ mensaje: "Categoría de restaurante eliminada exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function patchCategoriaRestaurante(req, res) {
    try {
        const id_categoriaActualizada = parseInt(req.params.id_categoriaActualizada);
        const { id_restaurante } = req.body;
        const resultado = await actualizarCategoriaRestaurante(id_restaurante, id_categoriaActualizada);
        res.status(200).json({ mensaje: "Categoría de restaurante actualizada exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

