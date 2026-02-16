import { Router } from "express";
import { requireAuth } from "../middlewares/authVerification.js";
import { getUserActivities } from "../controllers/activity.js";

const activitiesRouter = Router()

activitiesRouter.get('/get', requireAuth, getUserActivities)

export default activitiesRouter