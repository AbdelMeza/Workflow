import { Router } from "express"
import { createProject, getProjects } from "../controllers/projects.js"
import { requireAuth } from "../middlewares/authVerification.js"
import { requireRole } from "../middlewares/roleVerification.js"

const projectsRouter = Router()

projectsRouter.post('/create', requireAuth, requireRole("freelancer"), createProject)
projectsRouter.get('/get', requireAuth, requireRole(["freelancer", "client"]), getProjects)

export default projectsRouter