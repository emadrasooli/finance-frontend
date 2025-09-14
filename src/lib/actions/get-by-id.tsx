export async function getTransactionById(id: number) {
  const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch transaction");
  return res.json();
}
