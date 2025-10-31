import { obtenerRankingRestaurantes } from "../services/ranking_avg.js";

export async function getRankingRestaurantes_controller(req, res) {
    try {
        const ranking = await obtenerRankingRestaurantes();
        res.status(200).json(ranking);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

