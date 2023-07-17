const { check } = require("express-validator");
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
    .withMessage("Email inválido"),

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
    
]
