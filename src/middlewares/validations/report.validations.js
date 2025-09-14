import { body, param } from "express-validator";
import { ReportModel } from "../../models/report.model.js";
import { UserModel } from "../../models/user.model.js";
import { TeamModel } from "../../models/team.model.js";

export const idReportValidator = [
  param("id")
    .isMongoId()
    .withMessage("El id no tiene el formato válido")
    .custom(async (id) => {
      const report = await ReportModel.findById(id);
      if (!report) {
        throw new Error("El reporte no existe");
      }
      return true;
    }),
];

export const createReportValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 5, max: 200 })
    .withMessage("El título debe tener entre 5 y 200 caracteres")
    .custom(async (title) => {
      const report = await ReportModel.findOne({ title });
      if (report) {
        throw new Error("El título del reporte ya existe");
      }
      return true;
    }),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 10, max: 5000 })
    .withMessage("El contenido debe tener entre 10 y 5000 caracteres"),

  body("status")
    .not()
    .exists()
    .withMessage("El status no se debe mandar en momento de crear el reporte"),

  body("author")
    .notEmpty()
    .withMessage("El autor es obligatorio")
    .isMongoId()
    .withMessage("El autor debe ser un ID válido")
    .custom(async (author) => {
      const user = await UserModel.findOne({
        _id: author,
        is_deleted: false,
      });
      if (!user) {
        throw new Error("El autor no existe");
      }
      return true;
    }),

  body("team")
    .notEmpty()
    .withMessage("El equipo es obligatorio")
    .isMongoId()
    .withMessage("El equipo debe ser un ID válido")
    .custom(async (team, { req }) => {
      const teamExists = await TeamModel.findById(team);
      if (!teamExists) {
        throw new Error("El equipo no existe");
      }
      const user_id = req.body.author;
      const user = await UserModel.findById(user_id);
      if (!user.teams.includes(team)) {
        throw new Error("El usuario no pertenece a este equipo");
      }
      return true;
    }),
];

export const updateReportValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 5, max: 200 })
    .withMessage("El título debe tener entre 5 y 200 caracteres")
    .custom(async (title, { req }) => {
      const report = await ReportModel.findOne({
        title,
        _id: { $ne: req.params.id },
      });
      if (report) {
        throw new Error("El título del reporte ya existe");
      }
      return true;
    }),

  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 10, max: 5000 })
    .withMessage("El contenido debe tener entre 10 y 5000 caracteres"),

  body("status")
    .optional()
    .isIn(["pending", "in-process", "completed"])
    .withMessage("El estado debe ser: pending, in-process o completed"),
];
