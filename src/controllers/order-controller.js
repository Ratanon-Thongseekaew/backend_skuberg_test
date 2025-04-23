const createError = require("../utils/create-errors");
const prisma = require("../configs/prisma");

exports.getAllOrders = async (req, res, next) => {};

exports.getOrderById = async (req, res, next) => {};

exports.createBuyOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { cryptoCurrencyId, amount, price } = req.body;
    const cryptoCurrency = await prisma.cryptoCurrency.findUnique({
      where: {
        id: Number(cryptoCurrencyId),
        isActive: true,
      },
    });
    if (!cryptoCurrency) {
      return createError(404, "Cryptocurrency is not found");
    }
    const userCryptoWallet = await prisma.wallet.findUnique({
      where: {
        userId_cryptoCurrencyId: {
          userId: userId,
          cryptoCurrencyId: Number(cryptoCurrencyId),
        },
      },
    });
    if (!userCryptoWallet) {
      return createError(404, "Wallet is not found");
    }
    //create buy order
    const order = await prisma.order.create({
      data: {
        userId: userId,
        cryptoCurrencyId: Number(cryptoCurrencyId),
        amount: Number(amount),
        price: Number(price),
        type: "BUY",
        status: "SUCCESS",
      },
    });
    await prisma.transaction.create({
      data: {
        userId: userId,
        cryptoCurrencyId: Number(cryptoCurrencyId),
        orderId: order.id,
        status: "SUCCESS",
        fee: 5555,
        paymentMethod: "WALLET",
        type: "BUY",
      },
    });
    await prisma.wallet.update({
      where: {
        userId_cryptoCurrencyId: {
          userId: userId,
          cryptoCurrencyId: Number(cryptoCurrencyId),
        },
      },
      data: {
        amount: {
          increment: Number(amount),
        },
      },
    });
    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};
exports.createSellOrder = async (req, res, next) => {};
