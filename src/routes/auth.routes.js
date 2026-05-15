let express = require("express");
const { registerController, loginController, resetPasswordController, forgotPasswordController } = require("../controllers/auth.controller");

let router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);


module.exports = router;
