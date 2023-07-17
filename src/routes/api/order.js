const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderById,
  getOrderByUser,
  addToOrder,
  clearOrder,
  removeAllFromOrder,
  removeOneItemFromOrder,
} = require("../../controllers/api/order.controller");
//cons = require("../../middlewares/jwt.middleware");

router
  .get("/", getOrders)
  .get("/detail/:orderId", getOrderById)
  .get("/user", getOrderByUser)
  .post("/", addToOrder)
  .delete("/clear/:orderId", clearOrder)
  .delete("/:itemId", removeAllFromOrder)
  .put("/:itemId", removeOneItemFromOrder);

module.exports = router;
