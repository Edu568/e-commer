let { check } = require('express-validator');

module.exports = [
    check("name")
        .notEmpty()
        .withMessage("El campo nombre no puede ir vacío")
        .isLength({ min: 5 })
        .withMessage("Ingrese más de 5 caracteres"),

    check("category")
        .notEmpty()
        .withMessage("Debes elegir una categoría"),

    check("subcategory")
        .notEmpty()
        .withMessage('Debes elegir una subcategoría'),

    check("price")
        .notEmpty()
        .withMessage('Coloca un precio')
        .isNumeric()
        .withMessage("Solo puedes ingresar números"),

    check("discount")
        .isInt({min:0,max:99})
        .withMessage("El descuento no puede ser más del 100%"),

    check("description")
        .notEmpty()
        .withMessage("Debe escribir una descripción del producto...")
        .isLength({ min: 20})
        .withMessage("La descripción debe tener al menos 20 caracteres"),

      

]
