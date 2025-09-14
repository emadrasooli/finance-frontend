
export async function updateTransaction(
  id: number,
  payload: { type: string; amount: number; description?: string; category?: string }
) {
  const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to update transaction");
  }

  return res.json();
}