import { matchedData } from "express-validator";
import { TeamModel } from "../models/team.model.js";
import { UserModel } from "../models/user.model.js";

export const addUserToTeam = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    await UserModel.findByIdAndUpdate(data.user_id, {
      $addToSet: { teams: data.team_id },
    });

    await TeamModel.findByIdAndUpdate(data.team_id, {
      $addToSet: { members: data.user_id },
    });
    return res.status(200).json({
      ok: true,
      msg: "Se añadido al usuario al team exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const removeUserFromTeam = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    await TeamModel.findByIdAndUpdate(data.team_id, {
      $pull: { members: data.user_id },
    });

    await UserModel.findByIdAndUpdate(data.user_id, {
      $pull: { teams: data.team_id },
    });

    return res.status(200).json({
      ok: true,
      msg: "Usuario removido del team exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
