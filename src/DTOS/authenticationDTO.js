import { body } from "express-validator";

export const registroDTO = [
    body("username").notEmpty().withMessage("El nombre es obligatorio"),
    body("password").isLength({min: 7}).withMessage("La contraseña debe ser mínimo de 6 caracteres"),
    body("role").isString.withMessage("El rol debe ser una cadena de texto"),
];

export const inicioSesionDTO = [
    body("email").isEmail().withMessage("Correo no válido"),
    body("contrasenia").notEmpty().withMessage("La contraseña es obligatoria")
]