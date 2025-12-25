import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import { loginUser, signupUser } from "./controllers/authentification.js"
import { getUserData } from "./controllers/users.js"
import projectsRouter from "./routers/projectsRouter.js"
import tasksRouter from "./routers/tasksRouter.js"

const app = express()

app.use(cors(), express.json())

app.post('/userSignup', signupUser)
app.post('/userLogin', loginUser)
app.get('/get-user-data', getUserData)
app.use('/project', projectsRouter)
app.use('/task', tasksRouter)

mongoose.connect('mongodb://localhost:27017/WorkFlow')

app.listen(2005, () => console.log("Server is working"))