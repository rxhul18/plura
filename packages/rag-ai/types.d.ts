declare module "types" {
    export interface RagAiConfigT {
      model: string; // The name of the model to use
      apiKey: string; // API key for authentication
      baseUrl: string; // Base URL for the API
    }
    export interface RagAiContextT {
        type: "text" | "embedding" | "pdf" | "csv" | "text-file" | "html";
        data: string;
        namespace: string;
      }
  }
  