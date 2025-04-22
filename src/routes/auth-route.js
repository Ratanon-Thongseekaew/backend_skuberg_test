const express = require("express")
const authRoutes = express.Router();
const authController =  require("../controllers/auth-controller")
const { validateWithZod, registerUser, loginUser } = require("../middlewares/validators");
const { authenticate } = require("../middlewares/auth-middleware");

authRoutes.post("/register",validateWithZod(registerUser),authController.register);
authRoutes.post("/login",validateWithZod(loginUser),authController.login)
authRoutes.get("/myProfile",authenticate,authController.currentUser)


module.exports = authRoutes;