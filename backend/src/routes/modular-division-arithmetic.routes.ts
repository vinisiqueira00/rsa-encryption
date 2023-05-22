import { Request, Response, Router } from "express";

import { ModularDivisionArithmeticAlgorithm } from "../lib/ModularDivisionArithmeticAlgorithm";

interface BodyRequest {
    firstNumber: number;
    secondNumber: number;
    moduleNumber: number;
}

type CustomRequest = Request<{}, {}, BodyRequest>;

const modularDivisionArithmeticRouter = Router();

modularDivisionArithmeticRouter.get(
    "/modular-division-arithmetic",
    (request: CustomRequest, response: Response) => {
        try {
            const bodyRequest = request.body;

            const modularDivisionArithmeticAlgorithm =
                new ModularDivisionArithmeticAlgorithm();

            const result = modularDivisionArithmeticAlgorithm.calculate(
                bodyRequest.firstNumber,
                bodyRequest.secondNumber,
                bodyRequest.moduleNumber
            );

            return response.json({ response: result });
        } catch (err) {
            return response.status(400).json({ error: (err as any).message });
        }
    }
);

export { modularDivisionArithmeticRouter };
