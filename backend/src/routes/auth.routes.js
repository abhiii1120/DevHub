let express = require("express");
const { registerController, loginController, resetPasswordController, forgotPasswordController, verifyOtpController } = require("../controllers/auth.controller");

let router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/verify-otp", verifyOtpController);
router.post("/reset-password", resetPasswordController);


module.exports = router;
