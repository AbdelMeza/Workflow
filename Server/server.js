import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import { loginUser, signupUser } from "./controllers/authentification.js"

const app = express()

app.use(cors(), express.json())

app.post('/signup', signupUser)
app.post('/login', loginUser)

mongoose.connect('mongodb://localhost:27017/WorkFlow')

app.listen(2005, ()=> console.log("Server is working"))