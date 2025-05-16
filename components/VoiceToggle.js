export default function ModelSelector({ model, setModel }) {
  return (
    <select value={model} onChange={e=>setModel(e.target.value)}>
      {["4omini","o4mini","4bigger","5omini","5bigger"].map(m=>(
        <option key={m} value={m}>{m}</option>
      ))}
    </select>
  );
}

await fetch("/api/chat", {
  method:"POST",
  body: JSON.stringify({ messages, model })
});
