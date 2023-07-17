const { check, body } = require("express-validator");
const path = require("path");
//const { readJSON } = require("../database");
const { User } = require("../database/models");

//const users = readJSON("users.json");
module.exports = [
      check("nombre").notEmpty().withMessage("El nombre es obligatorio").bail().isLength({ min: 3, max: 30 }).withMessage("En nombre debe tener entre 3 y 20 caracteres"),
      check("apellido").notEmpty().withMessage("El apellido es obligatorio").bail().isLength({ min: 3, max: 20 }).withMessage("En apellido debe tener entre 3 y 20 caracteres"),

      check("email").notEmpty().withMessage("El email es obligatorio").bail().isEmail().withMessage("Email invalido"),
      body("email").custom((value) => {
            //let user = users.find(user => user.email === value);
            return User.findOne({
                  where: {
                        email: value,
                  },
            })
                  .then((user) => {
                        if (user) return Promise.reject("Email ya registrado");
                  })
                  .catch(() => Promise.reject("Email ya registrado"));
      }),
      check("pass")
            .notEmpty()
            .withMessage("Debes escribir tu contraseña")
            .bail()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,12}$/)
            .withMessage("La contraseña debe contener entre 8 o 12 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial"),

      body("pass2")
            .notEmpty()
            .withMessage("La contraseña no es valido")
            .bail()
            .custom((value, { req }) => (value !== req.body.pass ? false : true))
            .withMessage("Las contraseñas no coinciden"),

      check("terms").isString("on").withMessage("Debes aceptar los términos y condiciones"),

      check("image").custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".web"];
            if (file && !acceptedExtensions.includes(path.extname(file.originalname))) {
                  throw new Error("archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif -.web)");
            }
            return true;
      }),
];
