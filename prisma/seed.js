const bcrypt = require("bcryptjs");
const prisma = require("../src/configs/prisma");

const hashedPassword = bcrypt.hashSync("123456", 10);

const userData = [
  {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@skuberg.com",
    password: hashedPassword,
  },
  {
    firstname: "Jane",
    lastname: "Smith",
    email: "jane.smith@skuberg.com",
    password: hashedPassword,
  },
  {
    firstname: "Alice",
    lastname: "Johnson",
    email: "alice.johnson@skuberg.com",
    password: hashedPassword,
  },
];

const cryptosData = [
  { name: "Bitcoin", price: 60000.0 },
  { name: "Ethereum", price: 3000.0 },
  { name: "Binance Coin", price: 400.0 },
  { name: "Cardano", price: 1.25 },
  { name: "Solana", price: 150.0 },
  { name: "Ripple", price: 0.85 },
  { name: "Polkadot", price: 6.5 },
  { name: "Litecoin", price: 200.0 },
  { name: "Avalanche", price: 90.0 },
  { name: "Dogecoin", price: 0.08 },
];

const walletData = [
  {
    userId: 1,
    cryptoCurrencyId: 1,
    balance: "0.25",
  },
  {
    userId: 1,
    cryptoCurrencyId: 2,
    balance: "4.5",
  },
  {
    userId: 1,
    cryptoCurrencyId: 3,
    balance: "15.75",
  },
];


const orderData = [
  {
    userId: 1,
    cryptoCurrencyId: 1,
    status: 'SUCCESS',
    amount: '0.05',
    price: '45000',
    type: 'BUY',
  },
  {
    userId: 1,
    cryptoCurrencyId: 1,
    status: 'SUCCESS',
    amount: '10',
    price: '2500',
    type: 'BUY',
  },
  {
    userId: 1,
    cryptoCurrencyId: 1,
    status: 'PENDING',
    amount: '0.02',
    price: '46000',
    type: 'SELL',
  },
  {
    userId: 2,
    cryptoCurrencyId: 1,
    status: 'SUCCESS',
    amount: '0.1',
    price: '44000',
    type: 'BUY',
  },
  {
    userId: 2,
    cryptoCurrencyId: 1,
    status: 'FAILED',
    amount: '50',
    price: '1.05',
    type: 'SELL',
  },
];

const transactionData = [
  {
    userId: 1,
    cryptoCurrencyId: 1,
    orderId: 1, // First order (BUY, SUCCESS)
    status: "SUCCESS",
    fee: "5.00",
    paymentMethod: "WALLET",
    type: "BUY",
  },
  {
    userId: 1,
    cryptoCurrencyId: 1,
    orderId: 2, // Second order (BUY, SUCCESS)
    status: "SUCCESS",
    fee: "3.50",
    paymentMethod: "WALLET",
    type: "BUY",
  },
  {
    userId: 1, 
    cryptoCurrencyId: 1,
    orderId: 3, // Third order (SELL, PENDING)
    status: "PENDING",
    fee: "4.25",
    paymentMethod: "WALLET",
    type: "SELL",
  },
  {
    userId: 2,
    cryptoCurrencyId: 1,
    orderId: 4, // Fourth order (BUY, SUCCESS)
    status: "SUCCESS",
    fee: "7.50",
    paymentMethod: "BANK",
    type: "BUY",
  },
  {
    userId: 2,
    cryptoCurrencyId: 1,
    orderId: 5, // Fifth order (SELL, FAILED)
    status: "FAILED",
    fee: "6.00",
    paymentMethod: "WALLET",
    type: "SELL",
  }
];

const run = async () => {
  try {
    const user = await prisma.user.createMany({
      data: userData,
      skipDuplicates: true,
    });
    console.log(`Created total ${user.count} users`);
    const crypto = await prisma.cryptoCurrency.createMany({
      data: cryptosData,
      skipDuplicates: true,
    });
    console.log(`✅ Created ${crypto.count} cryptocurrencies`);
    const wallet = await prisma.wallet.createMany({
      data: walletData,
      skipDuplicates: true,
    });
    console.log(`✅ Created ${wallet.count} wallets`);
    const order = await prisma.order.createMany({
      data: orderData,
      skipDuplicates: true,
    });
    console.log(`✅ Created ${order.count} orders`);
    const transaction = await prisma.transaction.createMany({
      data: transactionData,
      skipDuplicates: true,
    });
    console.log(`✅ Created ${order.count} transactions`);
  } catch (error) {
    console.error("Error:", error);
  }
};
run();
