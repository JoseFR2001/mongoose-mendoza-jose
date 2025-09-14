import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const idUserValidator = [
  param("id")
    .isMongoId()
    .withMessage("El id no tiene el formato valido")
    .custom(async (id) => {
      const idUser = await UserModel.findOne({ _id: id, is_deleted: false });
      if (!idUser) {
        throw new Error("El usuario no existe");
      }
      return true;
    }),
];

export const idAltaUserValidator = [
  param("id")
    .isMongoId()
    .withMessage("El id no tiene el formato valido")
    .custom(async (id) => {
      const idUser = await UserModel.findOne({ _id: id, is_deleted: true });
      if (!idUser) {
        throw new Error("El usuario no existe o esta activo");
      }
      return true;
    }),
];

export const createUserValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio")
    .isAlphanumeric()
    .withMessage(
      "El username solo puede ser alfanumerico, no se permiten otros caracteres especiales"
    )
    .isLength({ min: 3, max: 100 })
    .withMessage("E username debe tener minimo 3 carcateres y maximo 100")
    .custom(async (username) => {
      const user = await UserModel.findOne({ username });
      if (user) {
        throw new Error("El username ya existe");
      }
      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("El password es obligatorio")
    .isLength({ min: 8 })
    .withMessage("El password debe tener mínimo 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "El password debe contener al menos una mayúscula, una minúscula y un número"
    ),

  body("teams").not().exists().withMessage("No se permite enviar teams"),

  body("is_deleted")
    .not()
    .exists()
    .withMessage("No se permite enviar is_deleted"),
  ,
  body("deleted_at")
    .not()
    .exists()
    .withMessage("No se permite enviar deleted_at"),
];

export const updateUserValidation = [
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio")
    .isAlphanumeric()
    .withMessage(
      "El username solo puede ser alfanumerico, no se permiten otros caracteres especiales"
    )
    .isLength({ min: 3, max: 100 })
    .withMessage("E username debe tener minimo 3 carcateres y maximo 100")
    .isString()
    .withMessage("El username debe ser un String")
    .custom(async (username, { req }) => {
      const user = await UserModel.findOne({
        username,
        _id: { $ne: req.params.id },
      });
      if (user) {
        throw new Error("El username ya existe");
      }
      return true;
    }),

  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .custom(async (email, { req }) => {
      const user = await UserModel.findOne({
        email,
        _id: { $ne: req.params.id },
      });
      if (user) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),

  body("password")
    .optional()
    .notEmpty()
    .withMessage("El password es obligatorio")
    .isLength({ min: 8, max: 100 })
    .withMessage("El password debe tener mínimo 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "El password debe contener al menos una mayúscula, una minúscula y un número"
    ),

  body("teams").not().exists().withMessage("No se permite enviar teams"),

  body("is_deleted")
    .not()
    .exists()
    .withMessage("No se permite enviar is_deleted"),
  ,
  body("deleted_at")
    .not()
    .exists()
    .withMessage("No se permite enviar deleted_at"),
];
