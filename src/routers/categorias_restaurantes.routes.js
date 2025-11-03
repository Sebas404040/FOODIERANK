import { Router } from "express";
import { validationDTO } from "../middelewares/validationDTO.js";
import { crearCategoria_RestauranteDTO, actualizarCategoria_RestauranteDTO } from "../DTOS/categoria_RestauranteDTO.js"
import { 
    getCategoriasRestaurantes, 
    postCategoriaRestaurante, 
    deleteCategoriaRestaurante, 
    actCategoriaRestaurante, 
    getCategoriaRestaurantePorId,
    patchCategoriaRestaurante 
} from "../controllers/categorias_restaurantes.controller.js";
import { autenticacionMidleware } from "../middelewares/authenticationMiddleware.js";

const router = Router();

router.get("/", getCategoriasRestaurantes);
router.get("/:id", getCategoriaRestaurantePorId);
router.post("/", autenticacionMidleware, crearCategoria_RestauranteDTO, validationDTO, postCategoriaRestaurante);
router.delete("/:id", autenticacionMidleware, deleteCategoriaRestaurante);

router.patch("/:id", autenticacionMidleware, actualizarCategoria_RestauranteDTO, validationDTO, actCategoriaRestaurante);


export default router;