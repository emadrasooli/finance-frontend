// lib/actions/get-all-transactions.ts
export async function getAllTransactions() {
  const res = await fetch("http://localhost:5000/api/transactions", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch transactions");

  const data = await res.json();

  // ensure always array
  return Array.isArray(data) ? data : data.data;
}
