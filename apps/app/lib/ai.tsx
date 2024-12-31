import { createAI } from "ai/rsc";

import { AiPrompt, ClientMessage, ServerMessage, sendMessage } from "@/actions/action";


export type AIState = ServerMessage[];
export type UIState = ClientMessage[];

export const AI = createAI<
  AIState,
  UIState,
  {
    sendMessage: ({prompt}:AiPrompt) => Promise<ClientMessage>;
  }
>({
  initialAIState: [],
  initialUIState: [],
  actions: {
    sendMessage,
  },
});
