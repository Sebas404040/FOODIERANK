import { Router } from "express";
import { validationDTO } from "../middelewares/validationDTO.js";
import { crearCategoria_RestauranteDTO, actualizarCategoria_RestauranteDTO } from "../DTOS/categoria_RestauranteDTO.js"
import { getCategoriasRestaurantes, postCategoriaRestaurante, deleteCategoriaRestaurante, patchCategoriaRestaurante } from "../controllers/categorias_restaurantes.controller.js";

const router = Router();

router.get("/", getCategoriasRestaurantes);
router.post("/", crearCategoria_RestauranteDTO, validationDTO, postCategoriaRestaurante);
router.delete("/:id", deleteCategoriaRestaurante);
router.patch("/:id_categoria", actualizarCategoria_RestauranteDTO, validationDTO, patchCategoriaRestaurante);

export default router;