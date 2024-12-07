import { RagAiConfigT } from "types";

export const validateConfig = (config: RagAiConfigT): void => {
    if (!config.model) {
        console.warn("Warning: Model name (RAG_MODEL) is not set. Using default value.");
      }
      
      if (!config.apiKey) {
        console.error("Error: RAG_AI_API_KEY is required but not set.");
        throw new Error("Missing required configuration: RAG_AI_API_KEY");
      }
      
      if (!config.baseUrl) {
        console.warn(
          "Warning: Base URL (RAG_API_BASE_URL) is not set. Using default value."
        );
  }
};
