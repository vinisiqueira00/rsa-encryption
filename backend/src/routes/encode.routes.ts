import { Request, Response, Router } from "express";
import { Encode } from "../algorithms/Encode";

interface BodyRequest {
    n: number;
    message: string;
}

type CustomRequest = Request<{}, {}, BodyRequest>;

const encodeRouter = Router();

encodeRouter.get("/encode", (request: CustomRequest, response: Response) => {
    try {
        const body = request.body;

        const encode = new Encode()
        const result = encode.encode(body.n, body.message)

        return response.json({ response: result });
    } catch (err) {
        return response.status(400).json({ error: (err as any).message });
    }
});

export { encodeRouter };
