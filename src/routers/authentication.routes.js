import { Router } from "express";
import { registrarUsuario_controller, iniciarSesion_controller } from "../controllers/authentication.controller.js";
import { registroDTO, inicioSesionDTO } from "../DTOS/authenticationDTO.js";
import { autenticacionMidleware } from "../middelewares/authenticationMiddleware.js";

const routerAuthentication = Router();

routerAuthentication.post("/register", registroDTO, registrarUsuario_controller);
routerAuthentication.post("/login", inicioSesionDTO, iniciarSesion_controller);
routerAuthentication.get("/", (req, res) => {
    res.status(200).send({ status: "OK", message: "Authentication service is healthy" });
});

export default routerAuthentication;