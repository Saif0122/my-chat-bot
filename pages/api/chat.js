import { requireUser, requireSubscription } from "../../lib/auth";

// pages/api/chat.js
export default async function handler(req, res) {
  await requireUser(req, res, async () => {
    await requireSubscription(req, res, async () => {
      // now you can trust req.user is set and paid/admin
      let { model, messages } = req.body;
      // if free user, restrict model
      const freeAllowed = ["4omini","o4mini"];
      if (req.user.role === "free" && !freeAllowed.includes(model)) {
        model = "o4mini";
      }
      // … your existing OpenAI streaming logic, using `model` …
    });
  });
}

import { OpenAI } from "../../../.gitignore/node_modules/openai/src"
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY })

export default async function handler(req, res) {
  const { messages } = req.query
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })

  // Start streaming
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: JSON.parse(messages),
    stream: true,
  })

  for await (const chunk of stream) {
    const token = chunk.choices[0].delta?.content || ''
    res.write(token)
  }
  res.end()
}
import pinecone from "../../lib/pinecone";
export default async function handler(req, res) {
  const { messages, model } = JSON.parse(req.body);

  // 1) Embed last user message
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: messages.slice(-1)[0].content
  });

  // 2) Fetch top-3 similar docs
  const index = pinecone.Index(process.env.PINECONE_INDEX);
  const pineRes = await index.query({
    topK: 3,
    vector: embedding.data[0].embedding,
    includeMetadata: true
  });

  // 3) Insert retrieved contexts into system prompt
  const system = {
    role: "system",
    content: `Use these private docs:\n${pineRes.matches.map(m=>m.metadata.text).join("\n---\n")}`
  };

  // 4) Stream with context + selected model
  // … same SSE code but `model: model || "gpt-4o-mini", messages: [system, ...messages]`
}


// pages/api/chat.js
import * as Sentry from ".gitignore/node_modules/@sentry/nextjs/src/index.types";

export default async function handler(req, res) {
  try {
    // ... your existing streaming logic ...
  } catch (err) {
    Sentry.captureException(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
