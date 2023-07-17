const router = require("express").Router();
const { addToOrder, removeOneItemFromOrder, removeAllFromOrder } = require("../../controllers/api/ordersControllers");

router.post("/order/add", addToOrder);
router.put("/order/remove/:idOrderItem", removeOneItemFromOrder);
router.delete("/order/remove/:idOrderItem", removeAllFromOrder);

module.exports = router;
