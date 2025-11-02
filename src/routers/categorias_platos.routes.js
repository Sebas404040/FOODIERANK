import { Router } from "express";
import { validationDTO } from "../middelewares/validationDTO.js";
import { createCategoriaPlatoDTO, updateCategoriaPlatoDTO  } from "../DTOS/categoria_platoDTO.js";
import { getCategoriasPlatos, postCategoriaPlato, deleteCategoriaPlato, patchCategoriaPlato, getCategoriaPlatoPorId } from "../controllers/categorias_platos.controller.js";
import { autenticacionMidleware } from "../middelewares/authenticationMiddleware.js";

const router = Router();

router.get("/", getCategoriasPlatos);
router.get("/:id", getCategoriaPlatoPorId);
router.post("/", autenticacionMidleware,createCategoriaPlatoDTO, validationDTO, postCategoriaPlato);
router.delete("/:id", autenticacionMidleware,deleteCategoriaPlato);
router.patch("/:id_categoriaActualizada", autenticacionMidleware, updateCategoriaPlatoDTO, validationDTO, patchCategoriaPlato);

export default router;

//checked