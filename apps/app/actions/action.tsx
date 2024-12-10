"use server";
import { ReactNode } from "react";
import { createStreamableValue, getMutableAIState, streamUI } from "ai/rsc";
import { togetherai } from "@ai-sdk/togetherai";
import { AI } from "@/lib/ai";
import { BotMessage } from "@/components/custom/onboarding/message";
import BeatLoader from "@/components/custom/onboarding/BeatLoader";
import { getSession } from "./session";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Proceed from "@/components/custom/onboarding/proceed";
import WorkspaceForm from "@/components/custom/onboarding/workspace-form";
import {sleep } from "@/lib/utils";
import { CoreMessage, generateId,ToolInvocation } from "ai";
export type ServerMessage = {
  id?: number;
  name?: "proceed" | "workspace" ;
  role: "user" | "assistant";
  content: string;
};

export type ClientMessage = {
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
  toolInvocations?: ToolInvocation[]
};

export const sendMessage = async (
  message: string
): Promise<ClientMessage> => {
  const history = getMutableAIState<typeof AI>();
  console.log(history.get().length)
  console.log("ai",history.get())

  history.update([...history.get(), { role: "user", content: message }]);

  const response = await streamUI({
    model: togetherai("meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"),
    system: `
    You are an onboarding assitand and you are helping users to onboard them to Plura AI.
    -any question not related to the onbaording should not be answered by you
    -if someone asks any message that is not related to the onboarding then you should respond with the exact same text "wlecome to Plura"
    -if the message comes as "should we continue" then call proceed tool
    The workflow is as follows:
    -User sends "yes" or "no" to proceed
    -If the user sends "yes" then the workflow is as follows:
    -then you call the workspace tool
    - If the user sends "no", respond with exactly: "please create a workspace to continue your onboarding" Do not call any tools for "no"
    - Only trigger the proceed tool when asking: "should we continue?"
    -If the user sends any message after workspace tool is called then you should respond with the same text:"Please create a workspace to continue"
    -dont call any tools if the user doesnt creates a workspace
    -If the message comes as workspace {workspaceName} created then respond with the exact same text "your first workspace has been created with name: {workspaceName} created" and dont call any tools
    `,
    messages: [{ role: "user", content: message }, ...history.get()],
    temperature: 0,
    initial: (
      <BotMessage>
        <BeatLoader />
      </BotMessage>
    ),
    text: async function ({ content, done }) {
      await sleep(1000);
      if (done) {
        history.done([...history.get(), { role: "assistant", content }]);
      }
      return <BotMessage>{content}</BotMessage>;
    },
    tools: {
      workspace: {
        description:
          "when the user responds with yes then render the workspace form",
        parameters: z.object({}),
        generate: async function* ({}) {
          yield (
            <BotMessage>
              <BeatLoader />
            </BotMessage>
          );
          console.log("before");
          history.done([
            ...history.get(),
            { role: "assistant", content: "workspace form rendered" },
          ]);
          console.log("history", history.get());
          console.log("after");

          return (
            <BotMessage>
              <WorkspaceForm />
            </BotMessage>
          );
        },
      },
      proceed: {
        description: `should we continue option that contains yes and no options`,
        parameters: z.object({}),
        generate: async function* ({}) {
          yield (
            <BotMessage>
              <BeatLoader />
            </BotMessage>
          );

          history.done([
            ...history.get(),
            { role: "assistant", content: "should be continue rendered" },
          ]);

          return (
            <BotMessage>
              <Proceed />
            </BotMessage>
          );
        },
      },
    },
  });

  return {
    id: Date.now(),
    role: "assistant" as const,
    display: response.value,
  };
};
 export const sendAiGreeting = async ():Promise<ClientMessage[]> => {
  const session= await getSession()
  const {name,email} = session!.user
  const contentString = `Hi ${name}, welcome to Plura AI!.Your email is ${email}.I am going to help you with oboarding your acccount`
  const history = getMutableAIState<typeof AI>();
  console.log("greeting history", history.get())
  const value = await streamUI({
    model: togetherai("meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"),
    system: ` always reply the exact same text exactly as it is: ${contentString}
    `,
    messages: history.get(),
    initial: (
      <BotMessage>
        <BeatLoader />
      </BotMessage>
    ),
    text: async function ({ content, done }) {
      await sleep(1000);
      if (done) {
        history.done([...history.get(), { role: "assistant", content }]);
      }
      return <BotMessage>{content}</BotMessage>;
    },
  });

  return [{
    id: Date.now(),
    role: "assistant" as const,
    display: value.value,
  }]
 }
