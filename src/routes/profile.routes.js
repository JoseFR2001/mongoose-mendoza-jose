import { Router } from "express";
import {
  createProfile,
  deletedProfile,
  getAllProfiles,
  getByIdProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

const profileRoutes = Router();

profileRoutes.post("/profile", createProfile);
profileRoutes.get("/profile", getAllProfiles);
profileRoutes.get("/profile/:id", getByIdProfile);
profileRoutes.put("/profile/:id", updateProfile);
profileRoutes.delete("/profile/:id", deletedProfile);

export default profileRoutes;
