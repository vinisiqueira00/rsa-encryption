import cors from "cors"
import express, { urlencoded } from "express"

import { router } from "./routes"

const app = express()

router.use(cors({ origin: 'http://localhost:3000' }))
app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

export { app }
