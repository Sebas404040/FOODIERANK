import { Router } from "express";
import { validationDTO } from "../middelewares/validationDTO.js";
import { createRestauranteDTO, updateRestauranteDTO } from "../DTOS/restauranteDTO.js";
import { getRestaurantes, postRestaurante, deleteRestaurante, patchRestaurante } from "../controllers/restaurantes.controller.js";
import { autenticacionMidleware } from "../middelewares/authenticationMiddleware.js";

const router = Router();

router.get("/", getRestaurantes);
router.post("/", autenticacionMidleware, createRestauranteDTO, validationDTO, postRestaurante);
router.delete("/:id", autenticacionMidleware, deleteRestaurante);
router.patch("/:id", autenticacionMidleware, updateRestauranteDTO, validationDTO, patchRestaurante);

export default router;

//checked