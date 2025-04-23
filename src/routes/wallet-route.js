const express = require("express")
const walletRoutes= express.Router()
const walletControllers = require("../controllers/wallet-controller");
const { authenticate } = require("../middlewares/auth-middleware");

walletRoutes.get("/wallet",authenticate,walletControllers.getWallet)
walletRoutes.patch("/wallet/:id",authenticate,walletControllers.addWalletBalance)

module.exports = walletRoutes;