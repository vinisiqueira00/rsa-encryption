import { Request, Response, Router } from "express"
import { Decryption } from "../algorithms/Decryption"

interface BodyRequest {
    n: number
    blocksEncoded: number[]
}

type CustomRequest = Request<{}, {}, BodyRequest>

export const decryptionRouter = Router()

decryptionRouter.get("/", (request: CustomRequest, response: Response) => {
    try {
        const body = request.body

        const decryption = new Decryption()
        const result = decryption.decode(body.n, body.blocksEncoded)

        return response.json({ response: result })
    } catch (err) {
        return response.status(400).json({ error: (err as any).message })
    }
})
