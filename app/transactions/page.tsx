import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import { db } from "../_lib/prisma";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Footer from "../_components/footer";

const TransactionsPage = async () => {
  const { userId } = await auth();

  //si no hay usuario logueado, redirigir a la página de login
  if (!userId) {
    redirect("/login");
  }

  //accesar a las transacciones de la base de datos del usuario logueado
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>

        <DataTable
          columns={transactionColumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </div>
      <Footer />
    </div>
  );
};

export default TransactionsPage;
