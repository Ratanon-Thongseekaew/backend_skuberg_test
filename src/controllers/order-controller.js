const createError = require("../utils/create-errors");
const prisma = require("../configs/prisma");

exports.userGetAllOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = "1", limit = "5" } = req.query;
    if (isNaN(Number(page)) || isNaN(Number(limit))) {
      return createError(400, "Invalid type for page or limit");
    }
    if (!userId) {
      return createError(400, "User ID is required");
    }
    const skip = (Number(page) - 1) * Number(limit);
    const order = await prisma.order.findMany({
      where: {
        userId: userId, 
      },
      select: {
        id: true,
        status: true,
        amount: true,
        type: true,
        cryptoCurrency: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
      skip: skip,
      take: Number(limit),
    });
    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};
exports.getOrderById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    if (!id) {
      return createError(400, "order ID must be provided");
    }
    if (isNaN(Number(id))) {
      return createError(400, "Invalid order ID");
    }
    const order = await prisma.order.findFirst({
      where: {
        id: Number(id),
        userId: userId
      },
      select: {
        id: true,
        status: true,
        amount: true,
        type: true,
        cryptoCurrency: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
    })
    res.status(200).json({ order });

  } catch (error) {
    next(error)
  }
};

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
    const totalCost = Number(amount) * Number(price);
    const fee = 5555;
    const totalAmount = totalCost + fee;

    if (!userCryptoWallet.balance < totalAmount) {
      return createError(400, "Insufficient balance in wallet");
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
        fee: fee,
        paymentMethod: "WALLET",
        type: "BUY",
      },
    });
    await prisma.$transaction([
      prisma.wallet.update({
        where: {
          userId_cryptoCurrencyId: {
            userId: userId,
            cryptoCurrencyId: Number(cryptoCurrencyId), // Main wallet
          },
        },
        data: {
          balance: {
            decrement: totalAmount,
          },
        },
      }),
      // Add the crypto
      prisma.wallet.update({
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
      }),
    ]);

    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};
exports.createSellOrder = async (req, res, next) => {
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
    if (userCryptoWallet.amount < Number(amount)) {
      return createError(400, "Insufficient cryptocurrency in wallet");
    }
    const totalValue = Number(amount) * Number(price);
    const fee = 5555;
    const netAmount = totalValue - fee;
    //create sell order
    const order = await prisma.order.create({
      data: {
        userId: userId,
        cryptoCurrencyId: Number(cryptoCurrencyId),
        amount: Number(amount),
        price: Number(price),
        type: "SELL",
        status: "SUCCESS",
      },
    });
    await prisma.transaction.create({
      data: {
        userId: userId,
        cryptoCurrencyId: Number(cryptoCurrencyId),
        orderId: order.id,
        status: "SUCCESS",
        fee: fee,
        paymentMethod: "WALLET",
        type: "SELL",
      },
    });
    await prisma.$transaction([
      // Increment the balance (add money received from selling)
      prisma.wallet.update({
        where: {
          userId_cryptoCurrencyId: {
            userId: userId,
            cryptoCurrencyId: Number(cryptoCurrencyId),
          },
        },
        data: {
          balance: {
            increment: netAmount,
          },
        },
      }),
      // Decrement the amount (subtract crypto sold)
      prisma.wallet.update({
        where: {
          userId_cryptoCurrencyId: {
            userId: userId,
            cryptoCurrencyId: Number(cryptoCurrencyId),
          },
        },
        data: {
          amount: {
            decrement: Number(amount),
          },
        },
      }),
    ]);
    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};
