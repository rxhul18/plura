import { RagAiConfigT } from "types";
import { validateConfig } from "../utils/types-validator";

export const ragAiConfig: RagAiConfigT = {
  model: process.env.RAG_MODEL || "codellama/CodeLlama-70b-Instruct-hf",
  apiKey: process.env.RAG_AI_API_KEY || "",
  baseUrl: process.env.RAG_API_BASE_URL || "https://api.together.xyz/v1",
};

validateConfig(ragAiConfig);