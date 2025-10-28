import { Router } from "express";
import { validationDTO } from "../middelewares/validationDTO.js";
import { createReseñaPlatoDTO } from "../DTOS/reseña_platoDTO.js";
import { getResenasPlatos, postResenaPlato, deleteResenaPlato, getResenasPlatoPorId } from "../controllers/resenas_platos.controller.js";

const router = Router();

router.get("/", getResenasPlatos);
router.get("/:id", getResenasPlatoPorId);
router.post("/", createReseñaPlatoDTO, validationDTO, postResenaPlato);
router.delete("/:id", deleteResenaPlato);

export default router;
