import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import snippetRoutes from "./routes/snippetRoutes.js"
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Configure CORS for Frontend
app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
))

app.use(express.json())

// Mount the routes
app.use("/snippets", snippetRoutes)

// Connect to DB first, THEN start the server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/snippets`)
    })
})