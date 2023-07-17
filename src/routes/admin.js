const express = require("express");
const router = express.Router();
const { index, products, create, store, edit, update, destroy } = require("../controllers/adminProductsControllers");
const { categories, updateCatergoryAdmin } = require("../controllers/adminCategoriesControllers");
const { subcategories, updateSucategoryAdmin } = require("../controllers/adminSubCategoriesControllers");
const { users, updateUserAdmin } = require("../controllers/adminUsersControllers");
const { uploadImagesProduct } = require("../middlewares/uploadImagesProduct");
const productValidator = require("../validator/productsValidator");
const adminNotSessionCheck = require("../middlewares/adminNotSessionCheck");

router.get("/", adminNotSessionCheck, index);

/**** PRODUCTS ****/
router.get("/products", adminNotSessionCheck, products);

router.get("/products/create", adminNotSessionCheck, create);
router.post("/products/create", uploadImagesProduct.single("image"), productValidator, store);

router.get("/products/edit/:id", adminNotSessionCheck, edit);
router.put("/products/edit/:id", uploadImagesProduct.single("image"), productValidator, update);

router.delete("/products/delete/:id", destroy);

/**** CATEGORIES ****/
router.get("/categories", adminNotSessionCheck, categories);

router.get("/categories/edit/:id", adminNotSessionCheck, updateCatergoryAdmin);

/**** SUBCATEGORIES ****/
router.get("/subcategories", adminNotSessionCheck, subcategories);

router.get("/subcategories/edit/:id", adminNotSessionCheck, updateSucategoryAdmin);

/**** USERS ****/
router.get("/users", adminNotSessionCheck, users);

router.put("/users/edit/:id", adminNotSessionCheck, updateUserAdmin);

/*router.delete("/users/delete/:id", destroy);*/
module.exports = router;
