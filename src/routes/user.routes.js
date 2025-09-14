import { Router } from "express";
import {
  activateUser,
  createUser,
  deletedUser,
  getAllUsers,
  getAllUsersDeleted,
  getByIdUser,
  updateUser,
} from "../controllers/user.controller.js";
import {
  createUserValidation,
  idAltaUserValidator,
  idUserValidator,
  updateUserValidation,
} from "../middlewares/validations/user.validations.js";
import { applyValidations } from "../middlewares/validator.js";

const userRoutes = Router();

userRoutes.post("/user", createUserValidation, applyValidations, createUser);

userRoutes.get("/user", getAllUsers);

userRoutes.get("/user/baja", getAllUsersDeleted);

userRoutes.get(
  "/user/baja/:id",
  idAltaUserValidator,
  applyValidations,
  getAllUsersDeleted
);

userRoutes.put(
  "/user/alta/:id",
  idAltaUserValidator,
  applyValidations,
  activateUser
);

userRoutes.get("/user/:id", idUserValidator, applyValidations, getByIdUser);

userRoutes.put(
  "/user/:id",
  idUserValidator,
  updateUserValidation,
  applyValidations,
  updateUser
);

userRoutes.delete("/user/:id", idUserValidator, applyValidations, deletedUser);

export default userRoutes;
