import { Router } from "express"
import { requireAuth } from "../middlewares/authVerification.js"
import { affiliateClient, getUserData, searchClient } from "../controllers/users.js"
import { requireRole } from "../middlewares/roleVerification.js"

const userRouter = Router()

userRouter.get('/data', requireAuth, getUserData)
userRouter.get('/search', requireAuth, requireRole(["freelancer"]), searchClient)
userRouter.post('/affiliate', requireAuth, requireRole(["freelancer"]), affiliateClient)

export default userRouter