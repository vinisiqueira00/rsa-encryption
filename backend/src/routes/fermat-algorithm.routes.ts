import { Request, Response, Router } from "express";

import { FermatAlgorithm } from "../lib/FermatAlgorithm";

interface BodyRequest {
    number: number;
}

type CustomRequest = Request<{}, {}, BodyRequest>;

const fermatAlgorithmRouter = Router();

fermatAlgorithmRouter.get(
    "/fermat",
    (request: CustomRequest, response: Response) => {
        try {
            const bodyRequest = request.body;

            if (!bodyRequest.number) {
                throw new Error("Parameter 'number' not found");
            }

            const fermatAlgorithm = new FermatAlgorithm();

            const result = fermatAlgorithm.calculate(bodyRequest.number);

            return response.json({ response: result });
        } catch (err) {
            return response.status(400).json({ error: (err as any).message });
        }
    }
);

export { fermatAlgorithmRouter };
