import { Request, Response, Router } from "express";

import { FactorizationAlgorithm } from "../lib/FactorizationAlgorithm";

interface BodyRequest {
    number: number;
}

type CustomRequest = Request<{}, {}, BodyRequest>;

const factorizationAlgorithmRouter = Router();

factorizationAlgorithmRouter.get(
    "/factorization",
    (request: CustomRequest, response: Response) => {
        try {
            const bodyRequest = request.body;

            if (!bodyRequest.number) {
                throw new Error("Parameter 'number' not found");
            }

            const factorizationAlgorithm = new FactorizationAlgorithm();

            const result = factorizationAlgorithm.calculate(bodyRequest.number);

            return response.json({ response: result });
        } catch (err) {
            return response.status(400).json({ error: (err as any).message });
        }
    }
);

export { factorizationAlgorithmRouter };
