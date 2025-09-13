import { Router } from "express";
import {
  createUser,
  deletedUser,
  getAllUsers,
  getByIdUser,
  updateUser,
} from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.post("/user", createUser);
userRoutes.get("/user", getAllUsers);
userRoutes.get("/user/:id", getByIdUser);
userRoutes.put("/user/:id", updateUser);
userRoutes.delete("/user/:id", deletedUser);

export default userRoutes;
