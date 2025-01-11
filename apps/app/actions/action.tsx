"use server";
import { ReactNode } from "react";
import { createStreamableValue, getMutableAIState, streamUI } from "ai/rsc";
import { togetherai } from "@ai-sdk/togetherai";
import { AI } from "@/lib/ai";
import {
  BotMessage,
  TextStreamMessage,
} from "@/components/custom/onboarding/message";
import BeatLoader from "@/components/custom/onboarding/BeatLoader";
import { getSession, onboardingComplete } from "./session";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Proceed from "@/components/custom/onboarding/proceed";
import WorkspaceForm from "@/components/custom/onboarding/workspace-form";
import { sleep } from "@/lib/utils";
import { CoreMessage, generateId, ToolInvocation } from "ai";
import ProjectForm from "@/components/custom/onboarding/project-form";
import { getFirstWorkspaceOfUser } from "./workspace";
import { getProjectOfUser } from "./project";
import OnboardComplete from "@/components/custom/onboarding/onboard-complete";
const aiPrompt = `

`;
export type ServerMessage = {
  id?: number;
  name?:
    | "should_continue"
    | "workspace_form"
    | "project_form"
    | "onboard_complete";
  role: "user" | "assistant";
  content: string;
};

export type ClientMessage = {
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
  content?: string;
  toolInvocations?: ToolInvocation[];
};

export interface AiPrompt {
  prompt: string;
}
export const sendMessage = async ({
  prompt,
}: AiPrompt): Promise<ClientMessage> => {
  const history = getMutableAIState<typeof AI>();
  history.update([...history.get(), { role: "user", content: prompt }]);

  const aiGreetingContext = await createAiGreeting();
  const contentStream = createStreamableValue("");
  const textComponent = <TextStreamMessage content={contentStream.value} />;
  const response = await streamUI({
    model: togetherai("meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"),
    system: `
You are an onboarding assistant for Plura AI. Your role is to guide users through the onboarding process by following these specific rules:

### General Guidelines:
1. **Onboarding Assistance Only**: Respond only to messages related to onboarding. If a message is unrelated, reply with the exact text: 
   **"welcome to Plura"**. 
   Do not provide any other information or take unrelated actions.

2. **Initial Interaction**: 
   When the user sends "onboard me" reply with the exact text: 
   ${aiGreetingContext}. 
   Do not call any tools at this stage.

### Workflow for Proceeding:
1. If the user asks **"should we continue?"**, trigger the \`proceed\` tool.
2. After triggering \`proceed\`, wait for the user's response: 
   - If the user responds with **"yes"**, call the \`workspace\` tool.
   - If the user responds with **"no"**, reply with the exact text: 
     **"please create a workspace to continue your onboarding."** 
     Do not call any tools for this response.

### Workspace Management:
1. If the user sends a message like workspace {workspaceName} created, respond with the exact text: 
   **"Your first workspace with name - ✅{workspaceName} has been created."**
2. If the user sends any message after the \`workspace\` tool is called (and before a workspace is created), reply with the exact text: 
   **"Please create a workspace to continue."**
3. Do not proceed or call any tools unless the user successfully creates a workspace.

### Project Form Handling:
1. If the user sends call project form with workspaceId:{workspaceId}, trigger the \`project\` tool.
-If the user sends "call onboardComplete tool" then trigger the \`onboardComplete\` tool.

### Key Restrictions:
- Only trigger tools as specified in the workflow.
- Follow the exact sequence of steps without deviation.
- Use exact text responses where specified.
- Avoid unnecessary actions or tool invocations outside the defined process.
- Only trigger tool one time for each request. */this is non negotiable/*.
`,
    messages: [{ role: "user", content: prompt }, ...history.get()],
    temperature: 0,
    initial: (
      <BotMessage>
        <BeatLoader />
      </BotMessage>
    ),
    text: async function ({ content, done }) {
      if (done) {
        history.done([...history.get(), { role: "assistant", content }]);

        contentStream.done();
      } else {
        contentStream.update(content);
      }

      return textComponent;
    },
    tools: {
      workspace: {
        description:
          "a tool that sends the workspace form to the user.When the user responds with yes or when the user asks to create a workspace then this tool should be called",
        parameters: z.object({}),
        generate: async function* ({}) {
          yield (
            <BotMessage>
              <BeatLoader />
            </BotMessage>
          );

          history.done([
            ...history.get(),
            {
              role: "assistant",
              name: "workspace_form",
              content: "workspace form for the user has been sent",
            },
          ]);

          const workspace: any = await getFirstWorkspaceOfUser();

          const workspaceId = workspace?.data?.firstWorkspace?.id ?? " ";
          const exisitingWorkspaceName =
            workspace?.data?.firstWorkspace?.name ?? " ";
          return (
            <BotMessage>
              <WorkspaceForm
                workspaceExists={!!workspace}
                id={workspaceId}
                existingWorkspaceName={exisitingWorkspaceName}
              />
            </BotMessage>
          );
        },
      },
      onboardComplete: {
        description:
          "a tool that is called after the project has been created.It marks the end of onboarding of user and should  be called after project tool.",
        parameters: z.object({}),
        generate: async function* ({}) {
          await sleep(2000);
          yield (
            <BotMessage>
              <p>Finishing onboarding ...</p>
            </BotMessage>
          );
          console.log("onboarding complete");
          history.done([
            ...history.get(),
            {
              role: "assistant",
              name: "onboard_complete",
              content: "should be continue rendered",
            },
          ]);

          return (
            <BotMessage>
              <OnboardComplete />
            </BotMessage>
          );
        },
      },
      project: {
        description:
          "A tool that sends the project form to the user after workspace creation.",
        parameters: z.object({
          workspaceId: z.string(),
        }),
        generate: async function* ({ workspaceId }) {
          yield (
            <BotMessage>
              <BeatLoader />
            </BotMessage>
          );
          console.log("workspaceId", workspaceId);
          await sleep(1000);
          history.done([
            ...history.get(),
            {
              role: "assistant",
              name: "project_form",
              content: "workspace form for the user has been sent",
            },
          ]);
          const existingProject: any = await getProjectOfUser(workspaceId);
          const exisitingProjectName = existingProject?.data?.name ?? " ";
          console.log(existingProject);
          return (
            <BotMessage>
              <ProjectForm
                workspaceId={workspaceId}
                projectExists={!!existingProject}
                existingProjectName={exisitingProjectName}
              />
            </BotMessage>
          );
        },
      },
      proceed: {
        description: `should we continue option that contains yes and no options`,
        parameters: z.object({}),
        generate: async function* ({}) {
          await sleep(3000);
          yield (
            <BotMessage>
              <BeatLoader />
            </BotMessage>
          );

          history.done([
            ...history.get(),
            {
              role: "assistant",
              name: "should_continue",
              content: "should be continue rendered",
            },
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

export const createAiGreeting = async () => {
  const session = await getSession();
  if (!session || !("user" in session)) {
    return;
  }
  const { name, email } = session.user;
  const contentString = `
  Hi ${name}, welcome to Plura AI! 🎉👋

I'm your onboarding assistant, here to guide you through every step.
I see your email is ${email}.📧

Let’s make this journey smooth and fun! If you have any questions, I’m just a message away🚀.
Ready to dive in? Let’s go!🏄‍♂️
`.trim();
  return contentString;
};
