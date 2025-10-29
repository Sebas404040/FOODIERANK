import { Router } from "express";
import { validationDTO } from "../middelewares/validationDTO.js";
import { registerUsuarioDTO } from "../DTOS/usuarioDTO.js";
import { getUsuarios, getUsuarioPorId, postUsuario, deleteUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", getUsuarios);
router.get("/:id", getUsuarioPorId);
router.post("/", registerUsuarioDTO, validationDTO, postUsuario);
router.delete("/:id", deleteUsuario);

export default router;

//checked