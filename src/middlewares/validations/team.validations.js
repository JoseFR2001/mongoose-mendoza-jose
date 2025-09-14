import { body, param } from "express-validator";
import { TeamModel } from "../../models/team.model.js";

export const idTeamValidator = [
  param("id")
    .isMongoId()
    .withMessage("El id no tiene el formato válido")
    .custom(async (id) => {
      const team = await TeamModel.findById(id);
      if (!team) {
        throw new Error("El equipo no existe");
      }
      return true;
    }),
];

export const createTeamValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre del equipo es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres")
    .custom(async (name) => {
      const team = await TeamModel.findOne({ name });
      if (team) {
        throw new Error("El nombre del equipo ya existe");
      }
      return true;
    }),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripción debe tener entre 10 y 500 caracteres"),

  body("members").not().exists().withMessage("No se permite enviar members"),
];

export const updateTeamValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre del equipo es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres")
    .custom(async (name, { req }) => {
      const team = await TeamModel.findOne({
        name,
        _id: { $ne: req.params.id },
      });
      if (team) {
        throw new Error("El nombre del equipo ya existe");
      }
      return true;
    }),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripción debe tener entre 10 y 500 caracteres"),

  body("members").not().exists().withMessage("No se permite enviar members"),
];
