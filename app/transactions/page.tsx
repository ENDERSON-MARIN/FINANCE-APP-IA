import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import { db } from "../_lib/prisma";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Footer from "../_components/footer";
import { TransactionDto } from "../_data/get-dashboard/types";

const TransactionsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const transactions: TransactionDto[] = (
    await db.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    })
  ).map((t) => ({ ...t, amount: Number(t.amount) }));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>

        <DataTable columns={transactionColumns} data={transactions} />
      </div>
      <Footer />
    </div>
  );
};

export default TransactionsPage;
