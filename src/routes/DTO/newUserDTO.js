import { check } from "express-validator";

export const newUserDTO = [
    check("email")
        .notEmpty().withMessage("El correo electrónico no puede estar vacío")
        .isEmail().withMessage("Debe ser una dirección de correo electrónico válida"),

    check("nickname")
        .notEmpty().withMessage("El nickname no puede estar vacío")
        .isLength({ min: 6 }).withMessage("El nickname debe tener al menos 6 caracteres"),

    check("password")
        .notEmpty().withMessage("La contraseña no puede estar vacía")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres")
        .matches(/(?=(.*[a-z]){3,})/).withMessage("La contraseña debe tener al menos 3 letras minúsculas")
        .matches(/(?=(.*[A-Z]){3,})/).withMessage("La contraseña debe tener al menos 3 letras mayúsculas")
        .matches(/(?=(.*\d){2,})/).withMessage("La contraseña debe tener al menos 2 números")
];
