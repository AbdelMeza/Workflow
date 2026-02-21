import { Router } from "express";
import { getActivitiesTypes, getProjectsStatus } from "../controllers/data.js";
import { requireAuth } from "../middlewares/authVerification.js";
import { requireRole } from "../middlewares/roleVerification.js";

const dataRouter = Router()

dataRouter.get('/activity_types', requireAuth, requireRole(["freelancer"]), getActivitiesTypes)
dataRouter.get('/project_status', requireAuth, requireRole(["freelancer"]), getProjectsStatus)

export default dataRouter