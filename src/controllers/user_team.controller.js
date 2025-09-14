import { TeamModel } from "../models/team.model.js";
import { UserModel } from "../models/user.model.js";

export const addUserToTeam = async (req, res) => {
  const { user_id, team_id } = req.params;
  try {
    await TeamModel.findByIdAndUpdate(team_id, {
      $addToSet: { members: user_id },
    });
    await UserModel.findByIdAndUpdate(user_id, {
      $addToSet: { teams: team_id },
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
    const { team_id, user_id } = req.params;

    await TeamModel.findByIdAndUpdate(team_id, { $pull: { members: user_id } });

    await UserModel.findByIdAndUpdate(user_id, { $pull: { teams: team_id } });

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
