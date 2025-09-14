import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { ProfileModel } from "../../models/profile.model.js";

export const idProfileValidator = [
  param("id")
    .isMongoId()
    .withMessage("El id no tiene el formato válido")
    .custom(async (id) => {
      const profile = await ProfileModel.findById(id);
      if (!profile) {
        throw new Error("El perfil no existe");
      }
      return true;
    }),
];

export const createProfileValidation = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El nombre solo puede contener letras"),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El apellido solo puede contener letras"),

  body("age")
    .notEmpty()
    .withMessage("La edad es obligatoria")
    .isInt({ min: 1, max: 120 })
    .withMessage("La edad debe ser un número entre 1 y 120"),

  body("address.street")
    .trim()
    .notEmpty()
    .withMessage("La calle es obligatoria")
    .isLength({ min: 3, max: 100 })
    .withMessage("La calle debe tener entre 3 y 100 caracteres"),

  body("address.city")
    .trim()
    .notEmpty()
    .withMessage("La ciudad es obligatoria")
    .isLength({ min: 3, max: 50 })
    .withMessage("La ciudad debe tener entre 3 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("La ciudad solo puede contener letras"),

  body("address.country")
    .trim()
    .notEmpty()
    .withMessage("El país es obligatorio")
    .isLength({ min: 3, max: 50 })
    .withMessage("El país debe tener entre 3 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El país solo puede contener letras"),

  body("user")
    .notEmpty()
    .withMessage("El usuario es obligatorio")
    .isMongoId()
    .withMessage("El usuario debe ser un ID válido")
    .custom(async (user) => {
      const userExists = await UserModel.findOne({
        _id: user,
        is_deleted: false,
      });
      if (!userExists) {
        throw new Error("El usuario no existe");
      }

      const existingProfile = await ProfileModel.findOne({ user });
      if (existingProfile) {
        throw new Error("El usuario ya tiene un perfil");
      }

      return true;
    }),
];

export const updateProfileValidation = [
  body("first_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El nombre solo puede contener letras"),

  body("last_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El apellido solo puede contener letras"),

  body("age")
    .optional()
    .isInt({ min: 1, max: 120 })
    .withMessage("La edad debe ser un número entre 1 y 120"),

  body("address.street")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La calle es obligatoria")
    .isLength({ min: 3, max: 100 })
    .withMessage("La calle debe tener entre 3 y 100 caracteres"),

  body("address.city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La ciudad es obligatoria")
    .isLength({ min: 3, max: 50 })
    .withMessage("La ciudad debe tener entre 3 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("La ciudad solo puede contener letras"),

  body("address.country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El país es obligatorio")
    .isLength({ min: 3, max: 50 })
    .withMessage("El país debe tener entre 3 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El país solo puede contener letras"),
];
