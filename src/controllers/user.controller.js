import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    return res.status(201).json({ ok: true, newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({ ok: true, users });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const getByIdUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    return res.status(200).json({ ok: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ ok: true, updateUser });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const deletedUser = async (req, res) => {
  try {
    const userDeleted = await UserModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ ok: true, msg: "Usuario eliminado", userDeleted });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
