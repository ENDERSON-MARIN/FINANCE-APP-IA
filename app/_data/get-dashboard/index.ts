import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import {
  TotalExpensePerCategory,
  TransactionDto,
  TransactionPercentagePerType,
} from "./types";
import { auth } from "@clerk/nextjs/server";

export const getDashboard = async (month: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const where = {
    userId,
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const safePercentage = (value: number, total: number): number => {
    if (!total || isNaN(total)) return 0;
    return Math.round((value / total) * 100);
  };

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: safePercentage(depositsTotal, transactionsTotal),
    [TransactionType.EXPENSE]: safePercentage(expensesTotal, transactionsTotal),
    [TransactionType.INVESTMENT]: safePercentage(
      investmentsTotal,
      transactionsTotal,
    ),
  };
  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: safePercentage(
      Number(category._sum.amount),
      expensesTotal,
    ),
  }));
  const lastTransactions: TransactionDto[] = (
    await db.transaction.findMany({
      where,
      orderBy: { date: "desc" },
      take: 15,
    })
  ).map((t) => ({ ...t, amount: Number(t.amount) }));
  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
};
