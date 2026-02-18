import { Router } from "express";
import { requireAuth } from "../middlewares/authVerification.js";
import { getActivities } from "../controllers/activity.js";

const activitiesRouter = Router()

activitiesRouter.get('/get', requireAuth, getActivities)

export default activitiesRouter