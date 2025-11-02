import {
    obtenerCategoriasPlatos,
    crearCategoriaPlato,
    eliminarCategoriaPlato,
    actualizarCategoriaPlato,
    obtenerCategoriaPlatoPorId,
    editarCategoriaPlato
} from "../services/categorias_platos.services.js";

export async function getCategoriasPlatos(req, res) {
    try {
        const categorias = await obtenerCategoriasPlatos();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function actCategoriaPlato(req, res) {
    try {
        const { nombre } = req.body;
        const id = parseInt(req.params.id);
        const resultado = await editarCategoriaPlato(id, nombre);
        res.status(200).json({ mensaje: "Categoría de plato actualizada exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function postCategoriaPlato(req, res) {
    try {
        const { nombre } = req.body;
        const resultado = await crearCategoriaPlato(nombre);
        res.status(201).json({ mensaje: "Categoría de plato creada exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function getCategoriaPlatoPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const categoria = await obtenerCategoriaPlatoPorId(id);
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function deleteCategoriaPlato(req, res) {
    try {
        const id  = parseInt(req.params.id);
        const resultado = await eliminarCategoriaPlato(id);
        res.status(200).json({ mensaje: "Categoría de plato eliminada exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function patchCategoriaPlato(req, res) {
    try {
        const id_categoriaActualizada = parseInt(req.params.id_categoriaActualizada);
        const { id_plato } = req.body;
        const resultado = await actualizarCategoriaPlato(id_plato, id_categoriaActualizada);
        res.status(200).json({ mensaje: "Categoría de plato actualizada exitosamente", resultado });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

