import cors from "cors"
import http from "http"
import express from "express"
import mongoose from "mongoose"
import { Server } from "socket.io"
import tasksRouter from "./routers/tasksRouter.js"
import { getUserData } from "./controllers/users.js"
import projectsRouter from "./routers/projectsRouter.js"
import { loginUser, signupUser } from "./controllers/authentification.js"

const app = express()
const server = http.createServer(app)
app.use(express.json(), cors())

export const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
})

app.post('/userSignup', signupUser)
app.post('/userLogin', loginUser)
app.get('/get-user-data', getUserData)
app.use('/project', projectsRouter)
app.use('/task', tasksRouter)

mongoose.connect('mongodb://localhost:27017/WorkFlow')

server.listen(2005, () => console.log("Server is working"))