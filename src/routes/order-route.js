const express = require("express")
const orderRoutes = express.Router()
const orderControllers = require("../controllers/order-controller")
const { authenticate } = require("../middlewares/auth-middleware")

orderRoutes.get("/orders",authenticate,orderControllers.userGetAllOrders)
orderRoutes.get("/orders/:id",authenticate,orderControllers.getOrderById)
orderRoutes.post("/buy",authenticate,orderControllers.createBuyOrder)
orderRoutes.post("/sell",authenticate,orderControllers.createSellOrder)


module.exports = orderRoutes;