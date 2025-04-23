const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const handleErrors = require("./src/middlewares/handleErrors")

const authRouter = require("./src/routes/auth-route")
const cryptoRouter = require("./src/routes/crypto-route")
const walletRouter = require("./src/routes/wallet-route")
const orderRouter = require("./src/routes/order-route")
const app = express();

//middlewares
app.use(cors()); // cross domain sharing
app.use(morgan("dev")) // show log in terminal 
app.use(express.json()) // read json

//Routing
app.use("/api",authRouter)
app.use("/api",cryptoRouter)
app.use("/api",walletRouter)
app.use("/api",orderRouter)


//handle error
app.use(handleErrors)
//start server
const PORT = 8000 
app.listen(PORT,()=>console.log(`This server is running on port ${PORT}`))