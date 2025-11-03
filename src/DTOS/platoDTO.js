import { body, param } from "express-validator";

export const createPlatoDTO = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio.').isString().withMessage('El nombre debe ser una cadena de texto.').isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.').trim(),
    body('categoriaId').notEmpty().withMessage('El id de la categoría es obligatorio.').isNumeric().withMessage('El id de la categoría debe ser un valor numérico.'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria.').isString().withMessage('La descripción debe ser una cadena de texto.').isLength({ min: 10, max: 500 }).withMessage('La descripción debe tener entre 10 y 500 caracteres.').trim(),
    body('precio').notEmpty().withMessage('El precio es obligatorio.').isNumeric().withMessage('El precio debe ser un valor numérico.').custom(value => value > 0).withMessage('El precio debe ser un número mayor que 0.').toFloat(),
    body('imagen_url').notEmpty().withMessage('La URL de la imagen es obligatoria.').isURL().withMessage('Debe proporcionar una URL válida para la imagen.'),
    body('id_restaurante').notEmpty().withMessage('El id del restaurante es obligatorio.').isNumeric().withMessage('El id del restaurante debe ser un valor numérico.')
];

export const updatePlatoDTO = [
    param('id').isNumeric().withMessage('El ID del plato en la URL debe ser numérico.'),
    body('nombre').optional().isString().withMessage('El nombre debe ser una cadena de texto.').isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.').trim(),
    body('categoriaId').optional().isNumeric().withMessage('El id de la categoría debe ser un valor numérico.'),
    body('descripcion').optional().isString().withMessage('La descripción debe ser una cadena de texto.').isLength({ min: 10, max: 500 }).withMessage('La descripción debe tener entre 10 y 500 caracteres.').trim(),
    body('precio').optional().isNumeric().withMessage('El precio debe ser un valor numérico.').custom(value => value > 0).withMessage('El precio debe ser un número mayor que 0.').toFloat(),
    body('imagen_url').optional().isURL().withMessage('Debe proporcionar una URL válida para la imagen.'),
    body('id_restaurante').optional().isNumeric().withMessage('El id del restaurante debe ser un valor numérico.')
];