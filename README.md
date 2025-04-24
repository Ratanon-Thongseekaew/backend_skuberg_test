# Skuberg Backend Test

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

## Workflow 

### Step 1 : git clone

```bash

```