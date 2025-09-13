import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json({ ok: true, newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.F;
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const getByIdUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const updateUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const deletedUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
