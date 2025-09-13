import { TeamModel } from "../models/team.model.js";

export const createTeam = async (req, res) => {
  try {
    const newTeam = await TeamModel.create(req.body);
    return res.status(201).json({ ok: true, newTeam });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const getAllTeams = async (req, res) => {
  try {
    const teams = await TeamModel.find();
    return res.status(200).json({ ok: true, teams });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const getByIdTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const team = await TeamModel.findById(id);
    return res.status(200).json({ ok: true, team });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const updateTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const updateTeam = await TeamModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ ok: true, updateTeam });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const deletedTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const teamDeleted = await TeamModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ ok: true, msg: "Equioi eliminado", teamDeleted });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
