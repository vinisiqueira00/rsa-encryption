import { Request, Response, Router } from "express";

import { BreakMessageIntoBlocks } from "../lib/BreakMessageIntoBlocks";

interface BodyRequest {
    text: string;
    n: number;
}

type CustomRequest = Request<{}, {}, BodyRequest>;

const breakMessageIntoBlocksRouter = Router();

breakMessageIntoBlocksRouter.get(
    "/break-message-into-blocks",
    (request: CustomRequest, response: Response) => {
        try {
            const bodyRequest = request.body;

            if (!bodyRequest.text) {
                throw new Error("Parameter 'text' not found");
            }

            const breakMessageIntoBlocks = new BreakMessageIntoBlocks();

            const message = breakMessageIntoBlocks.textToMessage(
                bodyRequest.text
            );

            const blocks = breakMessageIntoBlocks.encode(
                message,
                bodyRequest.n
            );

            return response.json({ response: blocks });
        } catch (err) {
            return response.status(400).json({ error: (err as any).message });
        }
    }
);

export { breakMessageIntoBlocksRouter };
