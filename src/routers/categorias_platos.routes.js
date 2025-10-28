import e, { Router } from "express";
import { validationDTO } from "../middelewares/validationDTO.js";
import { createCategoriaPlatoDTO, updateCategoriaPlatoDTO  } from "../DTOS/categoria_platoDTO.js";
import { getCategoriasPlatos, postCategoriaPlato, deleteCategoriaPlato, patchCategoriaPlato } from "../controllers/categorias_platos.controller.js";

const router = Router();

router.get("/", getCategoriasPlatos);
router.post("/", createCategoriaPlatoDTO, validationDTO, postCategoriaPlato);
router.delete("/:id_plato", deleteCategoriaPlato);
router.patch("/:id_plato", updateCategoriaPlatoDTO, validationDTO, patchCategoriaPlato);

export default router;