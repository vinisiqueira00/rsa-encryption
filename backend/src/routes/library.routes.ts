import { Request, Response, Router } from "express";

type CustomRequest = Request<{}, {}, any>;

const libraryRouter = Router();

libraryRouter.get("/library", (request: CustomRequest, response: Response) => {
    try {
        const bodyRequest = request.body;

        return { response: bodyRequest }
    } catch (err) {
        return response.status(400).json({ error: (err as any).message });
    }
});

export { libraryRouter };
