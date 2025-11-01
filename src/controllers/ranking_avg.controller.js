import { rankingRestaurantes, rankingPlatos } from "../services/ranking_avg.js";

export async function getRankingRestaurantes_controller(req, res) {
    try {
        const restauranteId = parseInt(req.params.id);
        const ranking = await rankingRestaurantes(restauranteId);
        res.status(200).json(ranking);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export async function getRankingPlatos_controller(req, res) {
    try {
        const platoId = parseInt(req.params.id);
        const ranking = await rankingPlatos(platoId);
        res.status(200).json(ranking);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}