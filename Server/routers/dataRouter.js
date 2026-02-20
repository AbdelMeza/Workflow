import { Router } from "express";
import { getActivitiesTypes } from "../controllers/data.js";
import { requireAuth } from "../middlewares/authVerification.js";
import { requireRole } from "../middlewares/roleVerification.js";

const dataRouter = Router()

dataRouter.get('/activity_types', requireAuth, requireRole(["freelancer"]), getActivitiesTypes)

export default dataRouter