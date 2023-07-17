const express = require("express");
const router = express.Router();
const { carrito, description, inSale, featured, filters, buscar, addToOrder } = require("../controllers/productosControllers");
const userNotSessionCheck = require("../middlewares/userNotSessionCheck");

router.get("/carrito", userNotSessionCheck, carrito);
router.post("/carrito/:idProduct", userNotSessionCheck, addToOrder);
router.get("/descripcion/:id", description);
router.get("/inSale", inSale);
router.get("/featured", featured);

router.get("/buscar", buscar);

router.get("/:category", filters);

module.exports = router;
