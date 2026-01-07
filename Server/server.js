import cors from "cors"
import http from "http"
import express from "express"
import mongoose from "mongoose"
import { Server } from "socket.io"
import authRouter from "./routers/authRouter.js"
import userRouter from "./routers/userRouter.js"
import tasksRouter from "./routers/tasksRouter.js"
import projectsRouter from "./routers/projectsRouter.js"
import { requireAuth } from "./middlewares/authVerification.js"

const app = express()
const server = http.createServer(app)
app.use(express.json(), cors())

export const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
})

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/project', projectsRouter)
app.use('/task', tasksRouter)

mongoose.connect('mongodb://localhost:27017/WorkFlow')

server.listen(2005, () => console.log("Server is working"))