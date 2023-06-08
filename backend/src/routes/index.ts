import cors from 'cors'
import { Router } from "express"

import { decryptionRouter } from "./decryption.routes"
import { encryptionRouter } from "./encryption.routes"
import { libraryRouter } from "./library.routes"
import { newDecryptionRouter } from "./new/decryption.routes"
import { newEncryptionRouter } from "./new/encryption.routes"
import { newKeysGenerationRouter } from "./new/keys-generation.routes"

export const router = Router()

router.use(cors({
    origin: 'http://localhost:3000'
}))

router.use("/encryption", encryptionRouter)
router.use("/decryption", decryptionRouter)
router.use("/libraries", libraryRouter)

router.use("/new/encryption", newEncryptionRouter)
router.use("/new/decryption", newDecryptionRouter)
router.use("/new/keys-generation", newKeysGenerationRouter)
