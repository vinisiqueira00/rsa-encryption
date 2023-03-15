import { Router } from "express";

import { ExtendedEuclideanAlgorithm } from "../lib/ExtendedEuclideanAlgorithm";

const extendedEuclideanAlgorithmRouter = Router();

extendedEuclideanAlgorithmRouter.get(
    "/extended-euclidean",
    (request, response) => {
        try {
            const extendedEuclideanAlgorithm = new ExtendedEuclideanAlgorithm();

            const respostas = [
                extendedEuclideanAlgorithm.calculate(1234, 54),
                extendedEuclideanAlgorithm.calculate(14, 35),
                extendedEuclideanAlgorithm.calculate(252, 180),
                extendedEuclideanAlgorithm.calculate(6643, 2873),
                extendedEuclideanAlgorithm.calculate(272828282, 3242),
                extendedEuclideanAlgorithm.calculate(35, 14),
                extendedEuclideanAlgorithm.calculate(42, 7),
                extendedEuclideanAlgorithm.calculate(7, 42),
                extendedEuclideanAlgorithm.calculate(10, 10),
            ];

            return response.json({ responses: respostas });
        } catch (err) {
            return response.status(400).json({ error: (err as any).message });
        }
    }
);

export { extendedEuclideanAlgorithmRouter };
