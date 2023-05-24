import { Router } from "express";

import { encryptionRouter } from "./encryption.routes";
import { libraryRouter } from "./library.routes";

export const router = Router();

router.use("/encryption", encryptionRouter);
router.use("/libraries", libraryRouter);
