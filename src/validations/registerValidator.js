const { check, body } = require("express-validator");
//const { users } = require("../old_database");
const { User } = require("../database/models");
const path = require('path');

module.exports = [
    check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),

    check("last_name")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener al menos 2 caracteres"),

    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Email inválido")
    .custom((value) => {
      return User.findOne({
        where: {
          email: value
        }
      })
      .then(user => {
        if(user) {
          return Promise.reject("Email ya registrado");
        }
      })
      .catch(error => {
        console.log(error);
        throw new Error("Email ya Registrado");
      });
    }),

    check('pass1')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña').bail()
    .isLength({
        min: 8,
    })
    .withMessage('La contraseña debe tener como mínimo 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/)
    .withMessage('La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial'),

    check('pass2')
    .custom((value, {req}) => value !== req.body.pass1 ? false : true)
    .withMessage('Las contraseñas no coinciden'),

    check('avatar')
    .custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Debes seleccionar una foto');
        }

        // Verificar la extensión del archivo
       const allowedExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (!allowedExtensions.test(fileExtension)) {
            throw new Error('El archivo debe tener una extensión válida (JPG, JPEG, PNG, GIF)');
        }

        return true;
    })
    .withMessage('Archivo invalido - El archivo debe tener una extensión válida JPG, JPEG, PNG, GIF '),

    check('terms')
    .isString('on')
    .withMessage('Debes aceptar los términos y condiciones')
]