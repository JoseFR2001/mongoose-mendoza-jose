import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { TeamModel } from "../../models/team.model.js";

export const addUserToTeamValidations = [
  body("user_id")
    .isMongoId()
    .withMessage("El id no tiene el formato valido")
    .custom(async (id) => {
      const idUser = await UserModel.findOne({ _id: id, is_deleted: false });
      if (!idUser) {
        throw new Error("El usuario no existe");
      }
      return true;
    }),

  body("team_id")
    .isMongoId()
    .withMessage("El id no tiene el formato válido")
    .custom(async (id) => {
      const team = await TeamModel.findById(id);
      if (!team) {
        throw new Error("El equipo no existe");
      }
      return true;
    })
    .custom(async (team_id, { req }) => {
      const user_id = req.body.user_id;
      const user = await UserModel.findById(user_id);
      if (user.teams.includes(team_id)) {
        throw new Error("El usuario ya pertenece a este equipo");
      }
      return true;
    }),
  ,
];

export const removeUserFromTeamValidations = [
  body("user_id")
    .isMongoId()
    .withMessage("El id no tiene el formato valido")
    .custom(async (id) => {
      const idUser = await UserModel.findOne({ _id: id, is_deleted: false });
      if (!idUser) {
        throw new Error("El usuario no existe");
      }
      return true;
    }),

  body("team_id")
    .isMongoId()
    .withMessage("El id no tiene el formato válido")
    .custom(async (id) => {
      const team = await TeamModel.findById(id);
      if (!team) {
        throw new Error("El equipo no existe");
      }
      return true;
    })
    .custom(async (team_id, { req }) => {
      const user_id = req.body.user_id;
      const user = await UserModel.findById(user_id);
      if (!user.teams.includes(team_id)) {
        throw new Error("El usuario no pertenece a este equipo");
      }
      return true;
    }),
  ,
];
