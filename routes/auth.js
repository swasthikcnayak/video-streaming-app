const express = require("express");
const router = express.Router();
const {
  checkDuplicateUsernameOrEmail,
  verifyToken,
} = require("../middlewares/authMiddleware");
const {
  signup,
  signin,
  tokenVerified,
} = require("../controller/authController");
const { checkSchema } = require("express-validator");
const { signupValidator, signInValidator } = require("../validators/authValidator");
const { validationMiddleware } = require("../middlewares/validationMiddleware");

router.get("/jwt/verify", [verifyToken], tokenVerified);

router.post(
  "/signup",
  checkSchema(signupValidator),
  [validationMiddleware, checkDuplicateUsernameOrEmail],
  signup
);

router.post(
  "/signin",
  checkSchema(signInValidator),
  [validationMiddleware],
  signin
);

module.exports = router;
