import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
  ExpenseNature,
} from "@prisma/client";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export interface TotalExpensePerCategory {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}

// Transaction com amount serializado como number (seguro para Client Components)
export interface TransactionDto {
  id: string;
  name: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
  expenseNature: ExpenseNature | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
