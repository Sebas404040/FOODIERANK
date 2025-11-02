import { body, param } from "express-validator";

export const crearCategoria_RestauranteDTO = [
    body('nombre').notEmpty().withMessage('El nombre de la categoría es obligatorio.').isString().withMessage('El nombre debe ser una cadena de texto.')
];
export const actualizarCategoria_RestauranteDTO = [
    body('nombre').notEmpty().withMessage('El nombre de la categoría es obligatorio.').isString().withMessage('El nombre debe ser una cadena de texto.').isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres.').trim()
];