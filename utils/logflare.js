import { Logflare } from "@logflare/sdk";
const logger = new Logflare({ apiKey: process.env.LOGFLARE_API_KEY, source: process.env.LOGFLARE_SOURCE });

logger.log({ level: "info", message: "User sent message", user: user.id });
