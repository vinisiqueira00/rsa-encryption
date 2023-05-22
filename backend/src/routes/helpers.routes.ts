import { Request, Response, Router } from "express";

import { Helpers } from "../helpers/global";

interface BodyRequest {
    character: string;
    string: string;
    code: string;
}

type CustomRequest = Request<{}, {}, BodyRequest>;

const helpersRouter = Router();

helpersRouter.get("/helpers", (request: CustomRequest, response: Response) => {
    try {
        const bodyRequest = request.body;

        const helpers = new Helpers();

        const charToInt = helpers.charToInt(bodyRequest.character);
        const intToChar = helpers.intToChar(charToInt);

        const stringToInt = helpers.stringToInt(bodyRequest.string);
        const intToString = helpers.intToString(stringToInt);

        const charToCode = helpers.charToCode(bodyRequest.code);
        const codeToChar = helpers.codeToChar(charToCode);

        // const charToInt = helpers.charToInt("5");
        // const intToChar = helpers.intToChar(5);

        // const stringToInt = helpers.stringToInt("1745");
        // const intToString = helpers.intToString(1745);

        // const charToCode = helpers.charToCode("A");
        // const codeToChar = helpers.codeToChar(165);

        return response.json({
            response: {
                charToInt,
                intToChar,

                stringToInt,
                intToString,

                charToCode,
                codeToChar,
            },
        });
    } catch (err) {
        return response.status(400).json({ error: (err as any).message });
    }
});

export { helpersRouter };
