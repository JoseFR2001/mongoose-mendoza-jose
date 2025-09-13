import { Router } from "express";
import {
  createTeam,
  deletedTeam,
  getAllTeams,
  getByIdTeam,
  updateTeam,
} from "../controllers/team.controller.js";

const teamRoutes = Router();

teamRoutes.post("/team", createTeam);
teamRoutes.get("/team", getAllTeams);
teamRoutes.get("/team/:id", getByIdTeam);
teamRoutes.put("/team/:id", updateTeam);
teamRoutes.delete("/team/:id", deletedTeam);

export default teamRoutes;
