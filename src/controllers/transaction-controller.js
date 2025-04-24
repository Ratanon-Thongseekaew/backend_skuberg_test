const express = require("express");
const prisma = require("../configs/prisma");

exports.getAllTransactions = async (req, res, next) => {
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
    const transaction = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        status: true,
        type: true,
        paymentMethod: true,
        fee: true,
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
    res.status(200).json({ transaction });
  } catch (error) {
    next(error);
  }
};

exports.getTransactionById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    if (!id) {
      return createError(400, "order ID must be provided");
    }
    if (isNaN(Number(id))) {
      return createError(400, "Invalid order ID");
    }
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: Number(id),
        userId: userId,
      },
      select: {
        id: true,
        status: true,
        type: true,
        paymentMethod: true,
        fee: true,
        cryptoCurrency: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
    });
    res.status(200).json({ transaction });
  } catch (error) {
    next(error);
  }
};
