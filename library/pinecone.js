import { PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient();
await pinecone.init({
  environment: process.env.PINECONE_ENV,
  apiKey:      process.env.PINECONE_KEY,
});
export default pinecone;
