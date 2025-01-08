import { createAI } from "ai/rsc";

import {
  AiPrompt,
  ClientMessage,
  ServerMessage,
  sendMessage,
} from "@/actions/action";

export type AIState = ServerMessage[];
export type UIState = ClientMessage[];

export const AI = createAI<
  AIState,
  UIState,
  {
    sendMessage: ({ prompt }: AiPrompt) => Promise<ClientMessage>;
  }
>({
  initialAIState: [],
  initialUIState: [],
  actions: {
    sendMessage,
  },
});

// export const getUIStateFromAIState = (aiState: Chat) => {
//   return aiState.messages
//     .filter((message) => message.role !== "system")
//     .map((message, index) => ({
//       id: `${aiState.chatId}-${index}`,
//       display:
//         message.role === "tool" ? (
//           message.content.map((tool) => {
//             return tool.toolName === "listStocks" ? (
//               <BotCard>
//                 {/* TODO: Infer types based on the tool result*/}
//                 {/* @ts-expect-error */}
//                 <Stocks props={tool.result} />
//               </BotCard>
//             ) : tool.toolName === "showStockPrice" ? (
//               <BotCard>
//                 {/* @ts-expect-error */}
//                 <Stock props={tool.result} />
//               </BotCard>
//             ) : tool.toolName === "showStockPurchase" ? (
//               <BotCard>
//                 {/* @ts-expect-error */}
//                 <Purchase props={tool.result} />
//               </BotCard>
//             ) : tool.toolName === "getEvents" ? (
//               <BotCard>
//                 {/* @ts-expect-error */}
//                 <Events props={tool.result} />
//               </BotCard>
//             ) : null;
//           })
//         ) : message.role === "user" ? (
//           <UserMessage>{message.content as string}</UserMessage>
//         ) : message.role === "assistant" &&
//           typeof message.content === "string" ? (
//           <BotMessage content={message.content} />
//         ) : null,
//     }));
// };
