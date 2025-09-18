// import { db } from "../_lib/prisma";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { TransactionColumns } from "./_columns";
import { db } from "../_lib/prisma";

const TransactionsPage = async () => {
  //accesar a las transacciones de la base de datos
  const transactions = await db.transaction.findMany();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button className="rounded-full">
          Add Transaction
          <ArrowDownUpIcon className="ml-1 inline-block" />
        </Button>
      </div>

      <DataTable columns={TransactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
