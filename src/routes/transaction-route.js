const express = require("express")
const transactionRoutes = express.Router()
const transactionControllers = require("../controllers/transaction-controller")
const { authenticate } = require("../middlewares/auth-middleware")

transactionRoutes.get("/transactions",authenticate,transactionControllers.getAllTransactions)
transactionRoutes.get("/transactions/:id",authenticate,transactionControllers.getTransactionById)


module.exports = transactionRoutes;