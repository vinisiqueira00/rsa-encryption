import { Request, Response, Router } from "express";

import { ModularPotentialArithmeticAlgorithm } from "../lib/ModularPotentialArithmeticAlgorithm";

interface BodyRequest {
    baseNumber: number;
    exponentNumber: number;
    moduleNumber: number;
}

type CustomRequest = Request<{}, {}, BodyRequest>;

const modularPotentialArithmeticRouter = Router();

modularPotentialArithmeticRouter.get(
    "/modular-potential-arithmetic",
    (request: CustomRequest, response: Response) => {
        try {
            const bodyRequest = request.body;

            const modularPotentialArithmeticAlgorithm =
                new ModularPotentialArithmeticAlgorithm();

            const result = modularPotentialArithmeticAlgorithm.calculate(
                bodyRequest.baseNumber,
                bodyRequest.exponentNumber,
                bodyRequest.moduleNumber
            );

            return response.json({ response: result });
        } catch (err) {
            return response.status(400).json({ error: (err as any).message });
        }
    }
);

export { modularPotentialArithmeticRouter };
