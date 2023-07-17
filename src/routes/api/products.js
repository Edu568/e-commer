const express = require ("express");
const router = express.Router();
const {getAll,getOne,productsImage} = require("../../controllers/api/productsApi")

router
    .get("/", getAll)
    .get("/:id", getOne)
    // .post("/api/products",store)
    .get("/:id/images", productsImage)
module.exports = router;