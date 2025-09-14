export async function deleteTransaction(id: number) {
  const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to delete transaction");
  }
  return res.json();
}