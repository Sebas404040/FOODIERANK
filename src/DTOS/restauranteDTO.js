import { body, param } from "express-validator";

export const createRestauranteDTO = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio.').isString().withMessage('El nombre debe ser una cadena de texto.').isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.').trim(),
    body('categoriaId').notEmpty().withMessage('El id de la categoría es obligatorio.').isNumeric().withMessage('El id de la categoría debe ser un valor numérico.'),
    body('direccion').notEmpty().withMessage('La dirección es obligatoria.').isString().withMessage('La dirección debe ser una cadena de texto.').isLength({ min: 10, max: 200 }).withMessage('La dirección debe tener entre 10 y 200 caracteres.').trim(),
    body('imagen_url').notEmpty().withMessage('La URL de la imagen es obligatoria.').isURL().withMessage('Debe proporcionar una URL válida para la imagen.'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria.').isString().withMessage('La descripción debe ser una cadena de texto.').isLength({ min: 10, max: 500 }).withMessage('La descripción debe tener entre 10 y 500 caracteres.').trim()
];

export const updateRestauranteDTO = [
    param('id').isNumeric().withMessage('El ID del restaurante en la URL debe ser numérico.'),
    body('nombre').optional().isString().withMessage('El nombre debe ser una cadena de texto.').isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.').trim(),
    body('categoriaId').optional().isNumeric().withMessage('El id de la categoría debe ser un valor numérico.'),
    body('direccion').optional().isString().withMessage('La dirección debe ser una cadena de texto.').isLength({ min: 10, max: 200 }).withMessage('La dirección debe tener entre 10 y 200 caracteres.').trim(),
    body('imagen_url').optional().isURL().withMessage('Debe proporcionar una URL válida para la imagen.'),
    body('descripcion').optional().isString().withMessage('La descripción debe ser una cadena de texto.').isLength({ min: 10, max: 500 }).withMessage('La descripción debe tener entre 10 y 500 caracteres.').trim()
];
