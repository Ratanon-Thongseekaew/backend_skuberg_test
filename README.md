# Skuberg Backend Test

## Description 
Code ใน github คือ Backend ที่ถูกสร้างขึ้นตาม ER-Diagram: https://drive.google.com/file/d/1OEy05qbdneOOCTF7jDQPa_t9h88ffuAk/view?usp=sharing
## Techstack 
Node.js, express.Js, bcryptjs, cors ,jsonwebtoken, dotenv, morgan, nodemon, prisma , zod

## Services
| Path | Method | Authen | params | query | body |  
|:--|:--|:--|:--|:--  |:--
USER-Auth 
|/api/register |post|-|-|-| {email,firstname,lastname,password,confirmPassword}
|/api/login|post|-|-|-| {email,password}
|/api/myProfile|get|y|-|-|-|
USER-CryptoCurrency
|/api/cryptocurrencies|get|y|-|?page|-|
|/api/cryptocurrencies/:id |get|y|id|-|-|
USER-Wallets
|/api/wallet|get|y|-|-|-|
|/api/wallet/:id|patch|y|id|-|{amount}|
USER-Order
/api/orders|get|y||?page|-|
/api/orders/:id|get|y|id|-|-|
/api/orders/buy|post|y|-|-|{cryptoCurrencyId,amount,price}|
/api/orders/sell|post|y|-|-|{cryptoCurrencyId,amount,price}|
USER-Transaction
/api/transactions|get|y|-|?page|-|
/api/transactions/:id|get|y|id|-|-|

## Set Up

### Step 1 : git clone

```bash
git clone https://github.com/Ratanon-Thongseekaew/backend_skuberg_test.git
```

### Step 2 : install the package

```bash
npm i 
```

### Step 3 : create .env and enter the data 
```bash
SECRET_KEY = secret
DATABASE_URL="mysql://root:yourMySQLPassword@localhost:YourLocalHostnumber/YourDatabaseName"
ตัวอย่าง
DATABASE_URL="mysql://root:123456@localhost:3306/skuberg_backend_test1"
```

### Step 4 : generate prisma schema 

```bash
npx prisma generate
```

หากยังไม่ให้ให้ลองใช้
```bash
npx prisma migrate dev
```
หากรันได้แล้วตัว Seed จะ run อัตโนมัติเมื่อการสร้าง Database เสร็จสิ้น 

### Step 5 : Run Seed (Optional)

หลังจากสร้าง Database ถ้า seed ไม่ทำงานสามารถใช้คำสั่งนี้ได้ 

```bash
npx prisma db seed
```

### Step 6: Start Server 

ใช้คำสั่งต่อไปนี้เพื่อให้ server ทำงาน

```bash
npm start
```
## Endpoints 

ต่อไปนี้คือ Endpoints ที่ผมใช้ Test ผ่าน Postman ครับ 

### 1. Auth

```bash
http://localhost:8000/api/register (body: {email,firstname,lastname,password,confirmPassword})
http://localhost:8000/api/login (body: {email,password})
http://localhost:8000/api/myProfile
```
### 2. Crypto

```bash
http://localhost:8000/api/cryptocurrencies?page=1
http://localhost:8000/api/cryptocurrencies/1
```

### 3. Wallet

```bash
http://localhost:8000/api/wallet
http://localhost:8000/api/wallet/1  (Body:	{amount})
```

### 4. Order

```bash 
http://localhost:8000/api/buy  (Body:	{cryptoCurrencyId,amount,price})
http://localhost:8000/api/sell  (Body:	{cryptoCurrencyId,amount,price})
http://localhost:8000/api/orders?page=1
http://localhost:8000/api/orders/2
```

### 5. Transaction

```bash
http://localhost:8000/api/transactions
http://localhost:8000/api/transactions/4
```