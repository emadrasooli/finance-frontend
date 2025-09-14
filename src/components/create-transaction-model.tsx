/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/create-transaction-modal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTransaction } from "@/lib/actions/create-transaction";

export function CreateTransactionModal({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const numericAmount = Number(amount);
    if (!type || Number.isNaN(numericAmount)) {
      setError("Please choose a type and enter a valid amount.");
      return;
    }

    setSaving(true);
    try {
      await createTransaction({
        type,
        amount: numericAmount,
        description: description || undefined,
        category: category || undefined,
      });

      // close + reset
      setOpen(false);
      setType("deposit");
      setAmount("");
      setDescription("");
      setCategory("");

      // let parent refresh or optimistically add created item
      onCreated();
    } catch (err: any) {
      setError(err?.message ?? "Failed to create");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Add transaction</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Create transaction</DialogTitle>
          <DialogDescription>
            Add a new transaction (deposit or withdraw).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type">Type</Label>
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                className="text-white"
                variant={type === "deposit" ? "default" : "outline"}
                onClick={() => setType("deposit")}
              >
                Deposit
              </Button>
              <Button
                type="button"
                className="text-white"
                variant={type === "withdraw" ? "default" : "outline"}
                onClick={() => setType("withdraw")}
              >
                Withdraw
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="0.00"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={description}
              className="mt-2"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Salary, Groceries"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Income, Food"
              className="mt-2"
            />
          </div>

          {error && <div className="text-destructive text-sm">{error}</div>}

          <DialogFooter>
            <Button
              variant="ghost"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="text-white">
              {saving ? "Saving…" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
