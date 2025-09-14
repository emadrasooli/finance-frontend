/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Transactions } from "@/types";
import { getTransactionById } from "@/lib/actions/get-by-id";
import { updateTransaction } from "@/lib/actions/update-transaction";

interface Props {
  id: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}

export function EditTransactionModal({
  id,
  open,
  onOpenChange,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState<Transactions | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);
    getTransactionById(id)
      .then((data) => setTransaction(data))
      .catch((err) => setError(err.message || "Failed to load transaction"))
      .finally(() => setLoading(false));
  }, [id, open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!transaction) return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      type: (fd.get("type") as string) || transaction.type,
      amount: Number(fd.get("amount")) || transaction.amount,
      description: (fd.get("description") as string) || transaction.description,
      category: (fd.get("category") as string) || transaction.category,
    };

    setSaving(true);
    setError(null);
    try {
      await updateTransaction(id, payload);
      onOpenChange(false);
      onUpdated();
    } catch (err: any) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Edit transaction</DialogTitle>
          <DialogDescription>
            Update the transaction and save changes.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <p>Loading…</p>
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : !transaction ? (
          <p>No transaction found.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                name="type"
                defaultValue={transaction.type}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                defaultValue={transaction.amount}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={transaction.description ?? ""}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                defaultValue={transaction.category ?? ""}
                className="mt-1"
              />
            </div>

            <DialogFooter>
              <Button
                variant="ghost"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="text-white">
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
