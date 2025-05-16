import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(()=>{
    fetch("/api/usage")
      .then(r=>r.json())
      .then(setData);
  },[]);
  if(!data) return <p>Loading…</p>;
  return (
    <table>
      <thead><tr><th>Date</th><th>Model</th><th>Tokens</th><th>Cost (USD)</th></tr></thead>
      <tbody>
        {data.map(u=>(
          <tr key={u._id}>
            <td>{new Date(u.timestamp).toLocaleString()}</td>
            <td>{u.model}</td>
            <td>{u.tokens}</td>
            <td>${u.costUSD.toFixed(4)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
