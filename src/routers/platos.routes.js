import { Router } from "express";
import { validationDTO } from "../middelewares/validationDTO.js";
import { createPlatoDTO, updatePlatoDTO } from "../DTOS/platoDTO.js";
import { getPlatos, postPlato, deletePlato, patchPlato } from "../controllers/platos.controller.js";

const router = Router();

router.get("/", getPlatos);
router.post("/", createPlatoDTO, validationDTO, postPlato);
router.delete("/:id", deletePlato);
router.patch("/:id", updatePlatoDTO, validationDTO, patchPlato);

export default router;

//checked