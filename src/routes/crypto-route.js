const express = require("express")
const cryptoRoutes = express.Router()
const cryptoControllers = require("../controllers/crypto-controller")
const { authenticate } = require("../middlewares/auth-middleware")

//get pagination
cryptoRoutes.get("/cryptocurrencies",authenticate,cryptoControllers.getCryptoCurrencies)
cryptoRoutes.get("/cryptocurrencies/:id",authenticate,cryptoControllers.getCryptocurrencyById)


module.exports = cryptoRoutes;