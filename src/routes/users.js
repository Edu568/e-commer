const express = require("express");
const router = express.Router();
const { login, storeLogin, logout, register, store, profile, profileEdit, profileUpdate, destroy } = require("../controllers/usersControllers");
const { uploadAvatar } = require("../middlewares/uploadAvatar");
const usersValidator = require("../validator/usersValidator");
const loginValidator = require("../validator/loginValidator");
const profileValidator = require("../validator/profileValidator");
const userNotSessionCheck = require("../middlewares/userNotSessionCheck");
const userInSessionCheck = require("../middlewares/userInSessionCheck");

router.get("/login", userInSessionCheck, login);
router.post("/login", loginValidator, storeLogin);
router.get("/logout", logout);

router.get("/register", userInSessionCheck, register);
router.post("/register", uploadAvatar.single("image"), usersValidator, store);

router.get("/profile", userNotSessionCheck, profile);
router.get("/profile/edit", userNotSessionCheck, profileEdit);
router.post("/profile/edit", uploadAvatar.single("image"), profileValidator, profileUpdate);

router.delete("/delete/:id", destroy);

module.exports = router;
