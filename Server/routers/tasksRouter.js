import { Router } from "express";
import { requireAuth } from "../middlewares/authVerification.js"
import { requireRole } from "../middlewares/roleVerification.js"
import { createTask, getTasks } from "../controllers/tasks.js"

const tasksRouter = Router()

tasksRouter.post('/create', requireAuth, requireRole(["freelancer"]), createTask)
tasksRouter.get('/all', requireAuth, requireRole(["freelancer"]), getTasks)

export default tasksRouter