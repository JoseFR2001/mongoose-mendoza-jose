import { Router } from "express";
import {
  createTeam,
  deletedTeam,
  getAllTeams,
  getByIdTeam,
  updateTeam,
} from "../controllers/team.controller.js";
import {
  createTeamValidation,
  idTeamValidator,
  updateTeamValidation,
} from "../middlewares/validations/team.validations.js";
import { applyValidations } from "../middlewares/validator.js";

const teamRoutes = Router();

teamRoutes.post("/team", createTeamValidation, applyValidations, createTeam);

teamRoutes.get("/team", getAllTeams);

teamRoutes.get("/team/:id", idTeamValidator, applyValidations, getByIdTeam);

teamRoutes.put(
  "/team/:id",
  idTeamValidator,
  updateTeamValidation,
  applyValidations,
  updateTeam
);

teamRoutes.delete("/team/:id", idTeamValidator, applyValidations, deletedTeam);

export default teamRoutes;
