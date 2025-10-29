import { Router } from "express";
import { validationDTO } from "../middelewares/validationDTO.js";
import { createReseñaRestauranteDTO } from "../DTOS/reseña_RestauranteDTO.js";
import { getResenasRestaurantes, postResenaRestaurante, deleteResenaRestaurante, getResenasRestaurantePorId } from "../controllers/resenas_restaurantes.controller.js";

const router = Router();

router.get("/", getResenasRestaurantes);
router.get("/:id", getResenasRestaurantePorId);
router.post("/", createReseñaRestauranteDTO, validationDTO, postResenaRestaurante);
router.delete("/:id", deleteResenaRestaurante);

export default router;

// checked