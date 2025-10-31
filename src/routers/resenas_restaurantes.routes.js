import { Router } from "express";
import { validationDTO } from "../middelewares/validationDTO.js";
import { createReseñaRestauranteDTO, updateReseñaRestauranteDTO } from "../DTOS/reseña_RestauranteDTO.js";
import { getResenasRestaurantes, postResenaRestaurante, deleteResenaRestaurante, getResenasRestaurantePorId, patchResenaRestaurante, putLikeResenaPlato } from "../controllers/resenas_restaurantes.controller.js";

const router = Router();

router.get("/", getResenasRestaurantes);
router.get("/:id", getResenasRestaurantePorId);
router.post("/", createReseñaRestauranteDTO, validationDTO, postResenaRestaurante);
router.patch("/:id", updateReseñaRestauranteDTO, validationDTO, patchResenaRestaurante);
router.delete("/:id", deleteResenaRestaurante);
router.patch("/like/:id", putLikeResenaPlato);

export default router;

// checked