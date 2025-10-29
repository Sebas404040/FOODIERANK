import { body, param } from "express-validator";

export const crearCategoria_RestauranteDTO = [
    body('nombre').notEmpty().withMessage('El nombre de la categoría es obligatorio.').isString().withMessage('El nombre debe ser una cadena de texto.')
];
export const actualizarCategoria_RestauranteDTO = [
    body('id_restaurante').isNumeric().withMessage('El ID del restaurante debe ser numérico.'),
    param('id_categoriaActualizada').isNumeric().withMessage('El ID de la categoría actualizada debe ser un valor numérico.')
];