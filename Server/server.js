import cors from "cors"
import http from "http"
import express from "express"
import mongoose from "mongoose"
import authRouter from "./routers/authRouter.js"
import userRouter from "./routers/userRouter.js"
import tasksRouter from "./routers/tasksRouter.js"
import projectsRouter from "./routers/projectsRouter.js"
import { initSocket } from "./socket.js"

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

initSocket(server)

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/project', projectsRouter)
app.use('/task', tasksRouter)

mongoose.connect('mongodb://localhost:27017/WorkFlow')

server.listen(2005, () => {
    console.log("Server is working on port 2005")
})
