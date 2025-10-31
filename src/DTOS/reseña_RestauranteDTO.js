import { body, param } from "express-validator";

export const createReseñaRestauranteDTO = [
    body('restauranteId').notEmpty().withMessage('El id del restaurante es obligatorio.').isNumeric().withMessage('El id del restaurante debe ser un valor numérico.'),
    body('usuarioId').notEmpty().withMessage('El id del usuario es obligatorio.').isNumeric().withMessage('El id del usuario debe ser un valor numérico.'),
    body('calificacion').notEmpty().withMessage('La calificación es obligatoria.').isFloat({ min: 1, max: 5 }).withMessage('La calificación debe ser un número entre 1 y 5.'),
    body('comentario').notEmpty().withMessage('El comentario es obligatorio.').isString().withMessage('El comentario debe ser una cadena de texto.')
];

export const updateReseñaRestauranteDTO = [
    param('id').isNumeric().withMessage('El ID de la reseña en la URL debe ser numérico.'),
    body('calificacion').optional().isFloat({ min: 1, max: 5 }).withMessage('La calificación debe ser un número entre 1 y 5.'),
    body('comentario').optional().isString().withMessage('El comentario debe ser una cadena de texto.')
];
