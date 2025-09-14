import { Router } from "express";
import {
  createUser,
  deletedUser,
  getAllUsers,
  getByIdUser,
  updateUser,
} from "../controllers/user.controller.js";
import {
  createUserValidation,
  idUserValidator,
  updateUserValidation,
} from "../middlewares/validations/user.validations.js";
import { applyValidations } from "../middlewares/validator.js";

const userRoutes = Router();

userRoutes.post("/user", createUserValidation, applyValidations, createUser);

userRoutes.get("/user", getAllUsers);

userRoutes.get("/user/:id", getByIdUser);

userRoutes.put(
  "/user/:id",
  idUserValidator,
  updateUserValidation,
  applyValidations,
  updateUser
);

userRoutes.delete("/user/:id", deletedUser);

export default userRoutes;
