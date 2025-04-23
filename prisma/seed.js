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
  } catch (error) {
    console.error("Error:", error);
  }
};
run();
