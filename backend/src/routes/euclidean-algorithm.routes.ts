import { Request, Response, Router } from "express";

import { EuclideanAlgorithm } from "../lib/EuclideanAlgorithm";

interface BodyRequest {
    firstNumber: number;
    secondNumber: number;
}

type CustomRequest = Request<{}, {}, BodyRequest>;

const euclideanAlgorithmRouter = Router();

euclideanAlgorithmRouter.get(
    "/euclidean",
    (request: CustomRequest, response: Response) => {
        try {
            const bodyRequest = request.body;

            if (!bodyRequest.firstNumber || !bodyRequest.secondNumber) {
                throw new Error(
                    "Parameter(s) 'firstNumber' or 'secondNumber' not found"
                );
            }

            const euclideanAlgorithm = new EuclideanAlgorithm();

            const result = euclideanAlgorithm.calculate(
                bodyRequest.firstNumber,
                bodyRequest.secondNumber
            );

            return response.json({ greatestCommonDivisor: result });
        } catch (err) {
            return response.status(400).json({ error: (err as any).message });
        }
    }
);

export { euclideanAlgorithmRouter };
