import { rankingRestaurantes, rankingPlatos } from "../services/ranking_avg.js";

export async function getRankingRestaurantes_controller(req, res) {
    try {
        const ranking = await rankingRestaurantes();
        res.status(200).json(ranking);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function getRankingPlatos_controller(req, res) {
    try {
        const ranking = await rankingPlatos();
        res.status(200).json(ranking);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}
