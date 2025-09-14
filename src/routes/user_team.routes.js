import { Router } from "express";
import {
  addUserToTeam,
  removeUserFromTeam,
} from "../controllers/user_team.controller.js";
import {
  addUserToTeamValidations,
  removeUserFromTeamValidations,
} from "../middlewares/validations/user_team.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const userTeamRouter = Router();
addUserToTeam;
userTeamRouter.post(
  "/user-team/add",
  addUserToTeamValidations,
  applyValidations,
  addUserToTeam
);
userTeamRouter.post(
  "/user-team/remove",
  removeUserFromTeamValidations,
  applyValidations,
  removeUserFromTeam
);
