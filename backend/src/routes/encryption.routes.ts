import { Request, Response, Router } from "express"
import { Encryption } from "../algorithms/Encryption"

interface BodyRequest {
    n: number
    message: string
}

type CustomRequest = Request<{}, {}, BodyRequest>

export const encryptionRouter = Router()

encryptionRouter.get("/", (request: CustomRequest, response: Response) => {
    try {
        const body = request.body

        const encryption = new Encryption()
        const result = encryption.encode(body.n, body.message)

        return response.json({ response: result })
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message })
    }
})
