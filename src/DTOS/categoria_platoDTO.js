import { body, param } from "express-validator";

export const createCategoriaPlatoDTO = [
    body('id').notEmpty().withMessage('El id es obligatorio.').isNumeric().withMessage('El id debe ser un valor numérico.'),
    body('nombre').notEmpty().withMessage('El nombre de la categoría es obligatorio.').isString().withMessage('El nombre debe ser una cadena de texto.').isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres.').trim()
];

export const updateCategoriaPlatoDTO = [
    param('id_plato').isNumeric().withMessage('El ID de la categoría en la URL debe ser numérico.'),
    body('id_categoriaActualizada').isNumeric().withMessage('El id_categoriaActualizada debe ser un valor numérico.')
];