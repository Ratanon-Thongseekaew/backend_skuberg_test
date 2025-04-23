const express = require("express")
const orderRoutes = express.Router()
const orderControllers = require("../controllers/order-controller")
const { authenticate } = require("../middlewares/auth-middleware")

orderRoutes.post("/buy",authenticate,orderControllers.createBuyOrder)



module.exports = orderRoutes;