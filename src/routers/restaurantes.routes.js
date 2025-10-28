import { Router } from "express";
import { validationDTO } from "../middelewares/validationDTO.js";
import { createRestauranteDTO, updateRestauranteDTO } from "../DTOS/restauranteDTO.js";
import { getRestaurantes, postRestaurante, deleteRestaurante, patchRestaurante } from "../controllers/restaurantes.controller.js";

const router = Router();

router.get("/", getRestaurantes);
router.post("/", createRestauranteDTO, validationDTO, postRestaurante);
router.delete("/:id", deleteRestaurante);
router.patch("/:id", updateRestauranteDTO, validationDTO, patchRestaurante);

export default router;