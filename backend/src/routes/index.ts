import { Router } from "express";

import { decryptionRouter } from "./decryption.routes";
import { encryptionRouter } from "./encryption.routes";
import { libraryRouter } from "./library.routes";

export const router = Router();

router.use("/encryption", encryptionRouter);
router.use("/decryption", decryptionRouter);
router.use("/libraries", libraryRouter);
