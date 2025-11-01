import { Router } from "express";

import { getRankingRestaurantes_controller, getRankingPlatos_controller } from "../controllers/ranking_avg.controller.js";

const routerRanking = Router();

routerRanking.get("/restaurantes/:id", getRankingRestaurantes_controller);
routerRanking.get("/platos/:id", getRankingPlatos_controller);

export default routerRanking;