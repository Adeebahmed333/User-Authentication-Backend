const express = require("express");

const UserController = require("../../controllers/user-controller");

const { AuthRequestValidator } = require("../../middlewares/index");
const router = express.Router();

router.post(
  "/signup",
  AuthRequestValidator.validateUserAuth,
  UserController.create
);
router.post("/signin", UserController.signIn);
router.get("/isAuthenticated", UserController.isAuthenticated);
router.post("/forgetpassword", UserController.forgotpassword);
module.exports = router;
