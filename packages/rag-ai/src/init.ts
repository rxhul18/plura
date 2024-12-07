import { RAGChat, custom } from "@upstash/rag-chat";
import { ragAiConfig } from "./config";
import { cache } from "@repo/cache";

export const ragAi = new RAGChat({
  model: custom(ragAiConfig.model, {
    apiKey: ragAiConfig.apiKey,
    baseUrl: ragAiConfig.baseUrl,
    analytics: { name: "langsmith", token: process.env.LANGCHAIN_API_KEY! },
  }),
  redis: cache,
  streaming: true,
  debug: true,
});
