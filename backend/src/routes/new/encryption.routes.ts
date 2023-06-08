import { Request, Response, Router } from "express";
import fs from 'fs';
import multer from 'multer';
import { Readable } from 'stream';

import { multerConfig } from "../../config/multer";

import { Encryption } from "../../algorithms/new/Encryption";

interface BodyRequest {
    publicKey: string
}

type CustomRequest = Request<{}, {}, BodyRequest>

const upload = multer(multerConfig)

export const newEncryptionRouter = Router()

newEncryptionRouter.post("/", upload.single('file'), (request: CustomRequest, response: Response) => {
    try {
        const file = request.file
        const { publicKey } = request.body

        if (!file) throw new Error('Arquivo não enviado.')

        fs.readFile(file.path, 'utf8', (err, contentFile) => {
            if (err) throw new Error('Erro ao ler o arquivo.')

            const encryption = new Encryption()
            const encodedBlocks = encryption.encode({
                message: contentFile,
                publicKey: publicKey,
            })

            const readableStream = new Readable();
            readableStream.push(encodedBlocks.join(';'));
            readableStream.push(null);

            response.setHeader('Content-Type', 'text/plain');
            response.setHeader('Content-Disposition', 'attachment; filename="arquivo.txt"');

            readableStream.pipe(response);
        })
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message })
    }
})
