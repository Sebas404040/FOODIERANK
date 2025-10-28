import { body, param } from "express-validator";

export const registerUsuarioDTO = [
    body('id').notEmpty().withMessage('El id es obligatorio.').isNumeric().withMessage('El id debe ser un valor numérico.'),
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio.').isString().withMessage('El nombre de usuario debe ser una cadena de texto.').isLength({ min: 3, max: 50 }).withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres.').trim(),
    body('password').notEmpty().withMessage('La contraseña es obligatoria.').isString().withMessage('La contraseña debe ser una cadena de texto.').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('role').notEmpty().withMessage('El rol es obligatorio.').isIn(['admin', 'user']).withMessage('El rol debe ser "admin" o "user".'),
    body('correo').notEmpty().withMessage('El correo es obligatorio.').isEmail().withMessage('Debe proporcionar un correo electrónico válido.').normalizeEmail(),
    body('telefono').notEmpty().withMessage('El teléfono es obligatorio.').isString().withMessage('El teléfono debe ser una cadena de texto.').isLength({ min: 10, max: 15 }).withMessage('El teléfono debe tener entre 10 y 15 caracteres.')
];

export const updateUsuarioDTO = [
    param('id').isNumeric().withMessage('El ID del usuario en la URL debe ser numérico.'),
    body('username').optional().isString().withMessage('El nombre de usuario debe ser una cadena de texto.').isLength({ min: 3, max: 50 }).withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres.').trim(),
    body('role').optional().isIn(['admin', 'user']).withMessage('El rol debe ser "admin" o "user".'),
    body('telefono').optional().isString().withMessage('El teléfono debe ser una cadena de texto.').isLength({ min: 10, max: 15 }).withMessage('El teléfono debe tener entre 10 y 15 caracteres.')
];
