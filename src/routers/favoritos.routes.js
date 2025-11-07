import { Router } from "express";
import { 
    postFavorito, getFavoritos, getFavoritostodos, deleteFavorito
} from "../controllers/favorito.controller.js";

const router = Router();

router.post("/", postFavorito);
router.get("/:id", getFavoritos);
router.get("/", getFavoritostodos);
router.delete("/", deleteFavorito);

export default router;