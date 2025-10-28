import { body, param } from "express-validator";

export const crearCategoriaDTO = [
    body("id").isString().trim().notEmpty().withMessage("Error de validación en el campo id de la categoría"),
    body("name").isString().trim().notEmpty().withMessage("Error de validación en el campo nombre de la categoría")
]

export const actualizarCategoriaDTO = [
    param("id").isString().trim().notEmpty().withMessage("Error de validación en el parámetro id de la categoría"),
    body("name").isString().trim().notEmpty().withMessage("Error de validación en el campo nombre de la categoría")
]