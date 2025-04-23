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
    { name: 'Bitcoin', price: 60000.00 },
    { name: 'Ethereum', price: 3000.00 },
    { name: 'Binance Coin', price: 400.00 },
    { name: 'Cardano', price: 1.25 },
    { name: 'Solana', price: 150.00 },
    { name: 'Ripple', price: 0.85 },
    { name: 'Polkadot', price: 6.50 },
    { name: 'Litecoin', price: 200.00 },
    { name: 'Avalanche', price: 90.00 },
    { name: 'Dogecoin', price: 0.08 }
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
  } catch (error) {
    console.error("Error:", error);
  }
};
run();
