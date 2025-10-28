import { body, param } from "express-validator";

export const crearCategoria_RestauranteDTO = [
    body("id").isString().trim().notEmpty().withMessage("Error de validación en el campo id de la categoría"),
    body('nombre').notEmpty().withMessage('El nombre de la categoría es obligatorio.').isString().withMessage('El nombre debe ser una cadena de texto.').isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres.').trim()
]

export const actualizarCategoria_RestauranteDTO = [
    param("id").isString().trim().notEmpty().withMessage("Error de validación en el parámetro id de la categoría"),
    body('nombre').notEmpty().withMessage('El nombre de la categoría es obligatorio.').isString().withMessage('El nombre debe ser una cadena de texto.').isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres.').trim()
]