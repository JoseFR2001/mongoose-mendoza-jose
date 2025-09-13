import { Router } from "express";
import userRoutes from "./user.routes.js";
import profileRoutes from "./profile.routes.js";
import reportRoutes from "./report.routes.js";
import teamRoutes from "./team.routes.js";

const router = Router();

router.use(userRoutes);
router.use(profileRoutes);
router.use(reportRoutes);
router.use(teamRoutes);

export default router;
