import { Request, Response, Router } from "express";

import { EratosthenesSieveAlgorithm } from "../lib/EratosthenesSieveAlgorithm";

interface BodyRequest {
    number: number;
}

type CustomRequest = Request<{}, {}, BodyRequest>;

const eratosthenesSieveAlgorithmRouter = Router();

eratosthenesSieveAlgorithmRouter.get(
    "/eratosthenes-sieve",
    (request: CustomRequest, response: Response) => {
        try {
            const bodyRequest = request.body;

            if (!bodyRequest.number) {
                throw new Error("Parameter 'number' not found");
            }

            const eratosthenesSieveAlgorithm = new EratosthenesSieveAlgorithm();

            const result = eratosthenesSieveAlgorithm.calculate(
                bodyRequest.number
            );

            return response.json({ response: result });
        } catch (err) {
            return response.status(400).json({ error: (err as any).message });
        }
    }
);

export { eratosthenesSieveAlgorithmRouter };
