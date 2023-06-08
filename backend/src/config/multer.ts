import multer from "multer";
import path from "path";

export const multerConfig = {
    // dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, 'uploads/')
        },
        filename: (req: any, file: any, cb: any) => {
            const ext = path.extname(file.originalname)
            cb(null, `${file.fieldname}-${Date.now()}${ext}`)
        }
    }),
    // limits: {
    //     fileSize: 2 * 1024 * 1024,
    // },
}
