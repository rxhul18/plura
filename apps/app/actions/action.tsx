"use server";
import { ReactNode } from "react";
import { getMutableAIState, streamUI } from "ai/rsc";
import { togetherai } from "@ai-sdk/togetherai";
import { AI } from "@/lib/ai";
import { BotMessage } from "@/components/custom/onboarding/message";

export type ServerMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ClientMessage = {
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
};

export const sendMessage = async (
  message: string
): Promise<{
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
}> => {
  const history = getMutableAIState<typeof AI>();
  history.update([...history.get(), { role: "user", content: message }]);
  const response = await streamUI({
    model: togetherai("deepseek-ai/deepseek-llm-67b-chat"),
    system: "You are a helpful assistant. give answer in only 10 words",
    messages: [{ role: "user", content: message }, ...history.get()],
    text: ({ content, done }) => {
      if (done) {
        history.update([
          ...history.get(),
          { role: "assistant", content: content },
        ]);
        console.log("done", ...history.get());
      }
      return <BotMessage>{content}</BotMessage>;
    },
  });


  return {
    id: Date.now(),
    role: "assistant" as const,
    display: response.value,
  };
};
