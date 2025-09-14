// actions/summary.ts
export async function getSummary() {
  const res = await fetch("http://localhost:5000/api/transactions/summary", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch summary data");
  }

  return res.json();
}
