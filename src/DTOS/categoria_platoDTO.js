import { body, param } from "express-validator";

export const createCategoriaPlatoDTO = [
    body('nombre').notEmpty().withMessage('El nombre de la categoría es obligatorio.').isString().withMessage('El nombre debe ser una cadena de texto.').isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres.').trim()
];

export const updateCategoriaPlatoDTO = [
    body('id_plato').isNumeric().withMessage('El ID del plato debe ser numérico.'),
    param('id_categoriaActualizada').isNumeric().withMessage('El id_categoriaActualizada debe ser un valor numérico.')
];