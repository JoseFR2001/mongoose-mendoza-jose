import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

export const createUser = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const password = await hashPassword(data.password);

    const newUser = await UserModel.create({
      username: data.username,
      email: data.email,
      password: password,
    });

    return res.status(201).json({
      ok: true,
      msg: "Usuario creado exitosamente",
      newUser,
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
      .populate("profile")
      .lean()
      .populate("report", "title status")
      .select("username email teams profile report");
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
      .populate("profile")
      .lean()
      .populate("report", "title status")
      .select("username email teams profile report");
    return res.status(200).json({ ok: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};

export const getAllUsersDeleted = async (req, res) => {
  try {
    const users = await UserModel.find({ is_deleted: true })
      .populate("teams", "name")
      .populate("profile")
      .lean()
      .populate("report", "title status")
      .select("-password");
    return res.status(200).json({ ok: true, users });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};

export const getByIdUserDeleted = async (req, res) => {
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

    if (data.password) {
      const password = await hashPassword(data.password);

      const usuarioActualizado = await UserModel.findByIdAndUpdate(
        id,
        {
          username: data.username,
          email: data.email,
          password: password,
        },
        { new: true }
      );
      return res.status(200).json({
        ok: true,
        msg: "Usuario actualizado exitosamente",
        usuarioActualizado,
      });
    }

    const usuarioActualizado = await UserModel.findByIdAndUpdate(
      id,
      {
        username: data.username,
        email: data.email,
      },
      { new: true }
    );
    return res.status(200).json({
      ok: true,
      msg: "Usuario actualizado exitosamente",
      usuarioActualizado,
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

export const activateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userEliminado = await UserModel.findByIdAndUpdate(
      id,
      {
        is_deleted: false,
        deleted_at: null,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ ok: true, msg: "Se dio de alta al asuario", userEliminado });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
