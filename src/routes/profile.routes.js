import { Router } from "express";
import {
  createProfile,
  deletedProfile,
  getAllProfiles,
  getByIdProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import {
  createProfileValidation,
  idProfileValidator,
  updateProfileValidation,
} from "../middlewares/validations/profile.validations.js";
import { applyValidations } from "../middlewares/validator.js";

const profileRoutes = Router();

profileRoutes.post(
  "/profile",
  createProfileValidation,
  applyValidations,
  createProfile
);

profileRoutes.get("/profile", getAllProfiles);

profileRoutes.get(
  "/profile/:id",
  idProfileValidator,
  applyValidations,
  getByIdProfile
);

profileRoutes.put(
  "/profile/:id",
  idProfileValidator,
  updateProfileValidation,
  applyValidations,
  updateProfile
);

profileRoutes.delete(
  "/profile/:id",
  idProfileValidator,
  applyValidations,
  deletedProfile
);

export default profileRoutes;
