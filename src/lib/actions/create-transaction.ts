export async function createTransaction(payload: {
  type: string;
  amount: number;
  description?: string;
  category?: string;
}) {
  const res = await fetch(`http://localhost:5000/api/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    // backend may return { success: false, error: "..." } or plain text
    const message = json?.error ?? (typeof json === "string" ? json : "Failed to create transaction");
    throw new Error(message);
  }

  // return the created transaction row (handles wrappers)
  return json?.data ?? json;
}
