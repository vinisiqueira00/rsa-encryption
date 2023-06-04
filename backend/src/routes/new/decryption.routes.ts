import { Request, Response, Router } from "express"
import { Decryption } from "../../algorithms/new/Decryption"

interface BodyRequest {
    blocksEncoded: string[]
    privateKey: string
}

type CustomRequest = Request<{}, {}, BodyRequest>

export const newDecryptionRouter = Router()

newDecryptionRouter.get("/", (request: CustomRequest, response: Response) => {
    try {
        const body = request.body

        const decryption = new Decryption()
        const result = decryption.decode({
            blocksEncoded: body.blocksEncoded,
            privateKey: body.privateKey,
        })

        return response.json({ response: result })
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message })
    }
})
