import { Router } from "express";

import { EuclideanAlgorithm } from "../lib/EuclideanAlgorithm";

const euclideanAlgorithmRouter = Router();

euclideanAlgorithmRouter.get("/euclidean", (request, response) => {
    try {
        const euclideanAlgorithm = new EuclideanAlgorithm();

        const respostas = [
            euclideanAlgorithm.calculate(1234, 54),
            euclideanAlgorithm.calculate(14, 35),
            euclideanAlgorithm.calculate(252, 180),
            euclideanAlgorithm.calculate(6643, 2873),
            euclideanAlgorithm.calculate(272828282, 3242),
            euclideanAlgorithm.calculate(35, 14),
            euclideanAlgorithm.calculate(42, 7),
            euclideanAlgorithm.calculate(7, 42),
            euclideanAlgorithm.calculate(10, 10),
        ];

        return response.json({ responses: respostas });
    } catch (err) {
        return response.status(400).json({ error: (err as any).message });
    }
});

export { euclideanAlgorithmRouter };
