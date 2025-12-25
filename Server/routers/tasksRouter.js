import { Router } from "express";
import { requireAuth } from "../middlewares/authVerification.js"
import { requireRole } from "../middlewares/roleVerification.js"
import { createTask, getTasks } from "../controllers/tasks.js"

const tasksRouter = Router()

tasksRouter.get('/all', requireAuth, requireRole(["freelancer"]), getTasks)
tasksRouter.post('/create', requireAuth, requireRole(["freelancer"]), createTask)

export default tasksRouter