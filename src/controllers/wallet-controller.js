const createError = require("../utils/create-errors");
const prisma = require("../configs/prisma");

exports.getWallet = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("Looking for wallets with userId:", userId);
    const wallets = await prisma.wallet.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        balance: true,
        cryptoCurrency: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });
    console.log("✅ Fetching Wallets...");
    console.log("User's wallets:", wallets);
    res.status(200).json({ wallets });
  } catch (error) {
    next(error);
  }
};

exports.addWalletBalance = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { amount } = req.body;
    const userId = req.user.id;
    if (!id || !amount) {
      return createError(400, "Wallet ID and amount are required");
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      return createError(400, "Amount must be a positive number");
    }
    const wallet = await prisma.wallet.findFirst({
        where: {
          id: Number(id),
          userId: userId
        }
      });
      if (!wallet) {
        return createError(404, "Wallet not found");
      }
      const updatedWallet =await prisma.wallet.update({
        where: {
            id: Number(id)
          },
          data: {
            balance: {
              increment: Number(amount)
            }
          },
      })
      console.log("✅ add Wallet Balance...");
      console.log(updatedWallet);
      res.status(200).json({ updatedWallet });
  } catch (error) {
    next(error)
  }
};
