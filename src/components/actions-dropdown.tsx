/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconDots } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTransaction } from "@/lib/actions/delete-transaction";
import { EditTransactionModal } from "./edit-transaction-model";

export function ActionsDropdown({
  id,
  onUpdated,
}: {
  id: number;
  onUpdated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const ok = confirm("Are you sure you want to delete this transaction?");
    if (!ok) return;
    setDeleting(true);
    try {
      await deleteTransaction(id);
      onUpdated(); // refresh list
    } catch (err: any) {
      alert(err.message || "Failed to delete transaction");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <IconDots />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-42">
          <DropdownMenuItem onSelect={() => setOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={handleDelete}
            className="text-destructive"
          >
            {deleting ? "Deleting…" : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTransactionModal
        id={id}
        open={open}
        onOpenChange={setOpen}
        onUpdated={onUpdated}
      />
    </>
  );
}
