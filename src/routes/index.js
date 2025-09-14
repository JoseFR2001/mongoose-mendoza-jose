import { Router } from "express";
import userRoutes from "./user.routes.js";
import profileRoutes from "./profile.routes.js";
import reportRoutes from "./report.routes.js";
import teamRoutes from "./team.routes.js";
import { userTeamRouter } from "./user_team.routes.js";

const router = Router();

router.use(userRoutes);
router.use(profileRoutes);
router.use(reportRoutes);
router.use(teamRoutes);
router.use(userTeamRouter);

export default router;
