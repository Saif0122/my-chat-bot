// components/ModelSelector.js
export default function ModelSelector({ model, setModel }) {
  return (
    <select value={model} onChange={e=>setModel(e.target.value)}>
      {["4omini","o4mini","4bigger","5omini","5bigger"].map(m=>(
        <option key={m} value={m}>{m}</option>
      ))}
    </select>
  );
}

import React from "react";

export default function ModelSelector({ model, setModel, user }) {
  const freeOnly = [
    { key: "4omini",  label: "Fast (4o-mini)" },
    { key: "o4mini",  label: "Balanced (o4-mini)" }
  ];
  const premium = [
    { key: "4bigger", label: "Deep (4-bigger)" },
    { key: "5omini",  label: "Creative (5o-mini)" },
    { key: "5bigger", label: "Max (5-bigger)" }
  ];

  // choose options based on user
  const options = [...freeOnly];
  if (user.role === "admin" || user.subscription.status === "active") {
    options.push(...premium);
  }

  return (
    <select value={model} onChange={e => setModel(e.target.value)}>
      {options.map(o => (
        <option key={o.key} value={o.key}>{o.label}</option>
      ))}
    </select>
  );
}
