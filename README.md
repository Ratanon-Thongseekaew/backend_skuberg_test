# Skuberg Test

## Service
| Path | Method | Authen | params | query | body |  
|:--|:--|:--|:--|:--  |:--
USER-Auth 
|/auth/register |post|-|-|-| {email,firstname,lastname,password,confirmPassword}
|/auth/login|post|-|-|-| {email,password}
|/auth/current-user|get|y|-|-|-|
USER-Wallets
|/wallet|get|y|-|-|-|
USER-Currency
|/currency|get|y|-|-|-|
USER-Order
/order|get|y|id|-|-|
/order/history|get|y|-|-|-|
USER-Transaction
/transaction|post|y|-|-|{currencyId, amount, toUserId}|
/transaction|get|y|-|-|-|
### Step 1 : Create Package 
```bash
npm init -y
```
### Step 2 : install package
```bash
npm install express nodemon cors morgan bcryptjs jsonwebtoken zod prisma dotenv
```
### Step 3 : Install Prisma ORM 
```bash
npx prisma init 
```
### Step 4 : determine server's PORT
กำหนด port ของ server ดังนี้
```bash
const PORT = 8000 
app.listen(PORT,()=>console.log(`This server is running on port ${PORT}`))
```
### Step 5 : Import middlewares 
```bash
app.user(cors()); // cross domain sharing [แชร์ข้อมูลจากต่าง server]
app.use(morgan("dev")) // show log in terminal 
app.use(express.json()) // read json
```

### Step 6 : update package.json

```bash
    "start": "nodemon app.js"
```

### Step 7 : Config and create Schema Model using Prisma ORM 
สร้างโมเดลให้เสร็จแล้วรันคำสั่ง 
```bash 
npx prisma migrate dev --name init
```
 ### Step 8 create handleError Middleware for errors catching
 ```bash
const handleErrors = (err,req,res,next)=>{

    res
    .status(err.statusCode || 500)
    .json({message: err.message || "something went wrong"})

}
module.exports = handleErrors
 ```
 
### Step 9 : create create-error utils for thorwing error 