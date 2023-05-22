import { Request, Response, Router } from "express";

import { ModularArithmeticAlgorithm } from "../lib/ModularArithmeticAlgorithm";

interface BodyRequest {
    moduleNumber: number;
    number: number;
}

type CustomRequest = Request<{}, {}, BodyRequest>;

const modularArithmeticRouter = Router();

modularArithmeticRouter.get(
    "/modular-arithmetic",
    (request: CustomRequest, response: Response) => {
        try {
            const bodyRequest = request.body;

            if (!bodyRequest.moduleNumber || !bodyRequest.number) {
                throw new Error("Parameter 'number' not found");
            }

            const modularArithmeticAlgorithm = new ModularArithmeticAlgorithm();

            const result = modularArithmeticAlgorithm.calculate(
                bodyRequest.moduleNumber,
                bodyRequest.number
            );

            return response.json({ response: result });
        } catch (err) {
            return response.status(400).json({ error: (err as any).message });
        }
    }
);

export { modularArithmeticRouter };
