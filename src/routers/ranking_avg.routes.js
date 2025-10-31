import { Router } from "express";

import { getRankingRestaurantes_controller } from "../controllers/ranking_avg.controller.js";

const routerRanking = Router();

routerRanking.get("/", getRankingRestaurantes_controller);

export default routerRanking;