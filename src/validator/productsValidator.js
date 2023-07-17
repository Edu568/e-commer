const { check } = require("express-validator");
const path = require("path");
module.exports = [
      check("name").notEmpty().withMessage("El nombre es obligatorio").bail().isLength({ min: 3, max: 150 }).withMessage("En nombre debe tener entre 3 y 150 caracteres"),
      check("price").notEmpty().withMessage("El precio es obligatorio").isFloat({ min: 0.1 }).withMessage("Lo estas regalando"),
      check("discount").isInt({ min: 0, max: 75 }).withMessage("Descuento no valido, debe ser entre 0-75"),
      check("description").notEmpty().withMessage("La descripcion es obligatorio").bail().isLength({ min: 20 }).withMessage("La descripcion debe tener minimo 20 caracteres"),
      check("category").notEmpty().withMessage("Debe indicar la categoria"),
      check("subcategory").notEmpty().withMessage("Debe indicar la SubCategoria"),
      check("sold").notEmpty().withMessage("Ingrese la cantidad vendida").isInt({ min: 0 }).withMessage("Las ventas no pueden ser negativas"),
      check("stock").notEmpty().withMessage("Ingrese un stock valido").isInt({ min: 1 }).withMessage("El stock debe ser mayor a cero"),
      check("img").custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
            if (file && !acceptedExtensions.includes(path.extname(file.originalname).toLowerCase())) {
                  throw new Error("archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif -.webp)");
            }
            return true;
      }),
];
