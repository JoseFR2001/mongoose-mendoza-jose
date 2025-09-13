import { ProfileModel } from "../models/profile.model.js";

export const createProfile = async (req, res) => {
  try {
    const newProfile = await ProfileModel.create(req.body);
    return res.status(201).json({ ok: true, newProfile });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.find();
    return res.status(200).json({ ok: true, profiles });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const getByIdProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await ProfileModel.findById(id);
    return res.status(200).json({ ok: true, profile });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const updateProfile = await ProfileModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ ok: true, updateProfile });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const deletedProfile = async (req, res) => {
  try {
    const profileDeleted = await ProfileModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ ok: true, msg: "Perfil eliminado", profileDeleted });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
