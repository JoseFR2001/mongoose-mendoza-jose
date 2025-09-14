import { Router } from "express";
import {
  createReport,
  deletedReport,
  getAllReports,
  getByIdReport,
  updateReport,
} from "../controllers/report.controller.js";
import {
  createReportValidation,
  idReportValidator,
  updateReportValidation,
} from "../middlewares/validations/report.validations.js";
import { applyValidations } from "../middlewares/validator.js";

const reportRoutes = Router();

reportRoutes.post(
  "/report",
  createReportValidation,
  applyValidations,
  createReport
);

reportRoutes.get("/report", getAllReports);

reportRoutes.get(
  "/report/:id",
  idReportValidator,
  applyValidations,
  getByIdReport
);

reportRoutes.put(
  "/report/:id",
  idReportValidator,
  updateReportValidation,
  applyValidations,
  updateReport
);

reportRoutes.delete(
  "/report/:id",
  idReportValidator,
  applyValidations,
  deletedReport
);

export default reportRoutes;
