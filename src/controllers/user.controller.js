import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const newUser = await UserModel.create({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return res.status(201).json({
      ok: true,
      msg: "Usuario creado exitosamente",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ is_deleted: false })
      .populate("teams", "name")
      .populate("profile", "-_id -user")
      .populate("report", "title status")
      .select("-password");
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
    const user = await UserModel.findById(id)
      .populate("teams", "name")
      .populate("profile", "-_id -user")
      .populate("report", "title status")
      .select("-password");
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
    const data = matchedData(req, { locations: ["body"] });

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      ok: true,
      msg: "Usuario actualizado exitosamente",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const deletedUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userEliminado = await UserModel.findByIdAndUpdate(
      id,
      {
        is_deleted: true,
        deleted_at: new Date(),
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ ok: true, msg: "Usuario eliminado", userEliminado });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
