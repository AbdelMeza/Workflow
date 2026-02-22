import { Router } from "express";
import { getActivitiesTypes, getProjectsStatus, getServices, searchService } from "../controllers/data.js";
import { requireAuth } from "../middlewares/authVerification.js";
import { requireRole } from "../middlewares/roleVerification.js";

const dataRouter = Router()

dataRouter.get('/activity_types', requireAuth, requireRole(["freelancer"]), getActivitiesTypes)
dataRouter.get('/project_status', requireAuth, requireRole(["freelancer"]), getProjectsStatus)
dataRouter.get('/services', requireAuth, requireRole(["freelancer"]), getServices)
dataRouter.get('/search_services', requireAuth, requireRole(["freelancer"]), searchService)

export default dataRouter