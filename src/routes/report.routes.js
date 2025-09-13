import { Router } from "express";
import {
  createReport,
  deletedReport,
  getAllReports,
  getByIdReport,
  updateReport,
} from "../controllers/report.controller.js";

const reportRoutes = Router();

reportRoutes.post("/report", createReport);
reportRoutes.get("/report", getAllReports);
reportRoutes.get("/report/:id", getByIdReport);
reportRoutes.put("/report/:id", updateReport);
reportRoutes.delete("/report/:id", deletedReport);

export default reportRoutes;
