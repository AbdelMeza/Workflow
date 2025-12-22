import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import { loginUser, signupUser } from "./controllers/authentification.js"
import { getUserData } from "./controllers/users.js"

const app = express()

app.use(cors(), express.json())

app.post('/userSignup', signupUser)
app.post('/userLogin', loginUser)
app.get('/get-user-data', getUserData)

mongoose.connect('mongodb://localhost:27017/WorkFlow')

app.listen(2005, ()=> console.log("Server is working"))