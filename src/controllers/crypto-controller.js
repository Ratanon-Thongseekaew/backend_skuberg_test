const createError = require("../utils/create-errors");
const prisma = require("../configs/prisma");

exports.getCryptoCurrencies = async (req, res, next) => {
  try {
    const { page = "1", limit = "5" } = req.query;

    if (isNaN(Number(page)) || isNaN(Number(limit))) {
      return createError(400, "Invalid type for page or limit");
    }
    const skip = (Number(page) - 1) * Number(limit);

    const crypto = await prisma.cryptoCurrency.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
      skip: skip,
      take: Number(limit),
    });

    console.log("✅ Fetching all cryto...");
    console.log(crypto);

    res.status(200).json({ crypto });
  } catch (error) {
    next(error);
  }
};

exports.getCryptocurrencyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return createError(400, "crypto ID must be provided");
    }

    if (isNaN(Number(id))) {
      return createError(400, "Invalid crypto ID");
    }
    const crypto = await prisma.cryptoCurrency.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        price: true,
        logo: true,
        isActive: true,
      },
    });
    console.log("✅ Fetching cryto by ID");
    console.log(crypto);
    res.status(200).json({ crypto });
  } catch (error) {
    next(error);
  }
};
