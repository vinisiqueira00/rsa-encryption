import { Request, Response, Router } from "express"
import { Encryption } from "../../algorithms/new/Encryption"

interface BodyRequest {
    message: string
    publicKey: string
}

type CustomRequest = Request<{}, {}, BodyRequest>

export const newEncryptionRouter = Router()

newEncryptionRouter.get("/", (request: CustomRequest, response: Response) => {
    try {
        const body = request.body

        const encryption = new Encryption()
        const result = encryption.encode({
            message: body.message,
            publicKey: body.publicKey,
        })

        return response.json({ response: result })
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message })
    }
})
