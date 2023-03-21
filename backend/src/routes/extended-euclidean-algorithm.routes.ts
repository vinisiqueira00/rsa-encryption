import { Request, Response, Router } from "express";

import { ExtendedEuclideanAlgorithm } from "../lib/ExtendedEuclideanAlgorithm";

interface BodyRequest {
    firstNumber: number;
    secondNumber: number;
}

type CustomRequest = Request<{}, {}, BodyRequest>;

const extendedEuclideanAlgorithmRouter = Router();

extendedEuclideanAlgorithmRouter.get(
    "/extended-euclidean",
    (request: CustomRequest, response: Response) => {
        try {
            const bodyRequest = request.body;

            if (!bodyRequest.firstNumber || !bodyRequest.secondNumber) {
                throw new Error(
                    "Parameter(s) 'firstNumber' or 'secondNumber' not found"
                );
            }

            const extendedEuclideanAlgorithm = new ExtendedEuclideanAlgorithm();

            const result = extendedEuclideanAlgorithm.calculate(
                bodyRequest.firstNumber,
                bodyRequest.secondNumber
            );

            return response.json({ response: result });
        } catch (err) {
            return response.status(400).json({ error: (err as any).message });
        }
    }
);

export { extendedEuclideanAlgorithmRouter };
