"use client";

import { useCallback, useEffect, useState } from "react";
import type { Transactions } from "@/types";
import { IconDownload, IconUpload } from "@tabler/icons-react";
import { ActionsDropdown } from "./actions-dropdown";
import { getAllTransactions } from "@/lib/actions/get-all-transactions";
import { CreateTransactionModal } from "./create-transaction-model";

export function TransactionSection() {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const data: Transactions[] = await getAllTransactions();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Transaction</h2>

        {/* Add button now opens the CreateTransactionModal */}
        <CreateTransactionModal onCreated={fetchTransactions} />
      </div>

      <div className="my-6 flex flex-col">
        {loading ? (
          <p>Loading transactions…</p>
        ) : transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          transactions.map((transaction: Transactions) => (
            <div key={transaction.id} className="border-b py-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div>
                    {transaction.type === "withdraw" ? (
                      <IconUpload
                        size={52}
                        className="bg-destructive/20 text-destructive rounded-full p-2"
                      />
                    ) : (
                      <IconDownload
                        size={52}
                        className="bg-primary/20 text-primary rounded-full p-2"
                      />
                    )}
                  </div>
                  <div>
                    <span className="font-medium">
                      {transaction.description}
                    </span>
                    <div className="text-sm text-gray-500">
                      {transaction.category}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span
                    className={`text-xl font-medium ${
                      transaction.type === "withdraw"
                        ? "text-destructive"
                        : "text-primary"
                    }`}
                  >
                    ؋ {transaction.amount}
                  </span>
                  <ActionsDropdown
                    id={transaction.id}
                    onUpdated={fetchTransactions}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
