import { matchedData } from "express-validator";
import { ProfileModel } from "../models/profile.model.js";

export const createProfile = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const newProfile = await ProfileModel.create({
      first_name: data.first_name,
      last_name: data.last_name,
      age: data.age,
      address: {
        street: data.address.street,
        city: data.address.city,
        country: data.address.country,
      },
      user: data.user,
    });

    return res.status(201).json({ ok: true, newProfile });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.find().populate("user", "-password");
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
    const profile = await ProfileModel.findById(id).populate(
      "user",
      "-password"
    );
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
    const data = matchedData(req, { locations: ["body"] });

    const updateProfile = await ProfileModel.findByIdAndUpdate(
      id,
      {
        first_name: data.first_name,
        last_name: data.last_name,
        age: data.age,
        address: {
          street: data.address.street,
          city: data.address.city,
          country: data.address.country,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ ok: true, updateProfile });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const deletedProfile = async (req, res) => {
  const { id } = req.params;
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
