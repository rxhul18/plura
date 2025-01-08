"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { sleep } from "@/lib/utils";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/lib/ai";
import { createWorkspace } from "@/actions/workspace";
import { set } from "date-fns";

export default function WorkspaceForm({
  workspaceExists,
  id,
  existingWorkspaceName,
}: {
  workspaceExists: boolean;
  id?: string;
  existingWorkspaceName?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(existingWorkspaceName ?? "");
  const { sendMessage } = useActions<typeof AI>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useUIState<typeof AI>();
  const [hasWorkspace, setHasWorkspace] = useState(workspaceExists);
  const [workspaceId, setWorkspaceId] = useState(id ?? "");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const workspaceName = data.get("workspace") as string;

    try {
      setIsLoading(true);
      const res: any = await createWorkspace(workspaceName);
      console.log("workspace", res);
      setWorkspaceId(res?.data.id);
      const response = await sendMessage({
        prompt: `Workspace ${workspaceName} created`,
      });
      setMessages((currentMessages) => [...currentMessages, response]);
      toast.success(`Workspace ${workspaceName} created`);
      setHasWorkspace(true);
      return res;
    } catch (error) {
      toast.error(`Error creating workspace!Please try again `);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      if (hasWorkspace) {
        const project = await sendMessage({
          prompt: `call project form with workspaceId:${workspaceId}`,
        });
        setMessages((currentMessages) => [...currentMessages, project]);
      }
    })();
  }, [hasWorkspace]);
  return (
    <Card className="bg-neutral-900/30 rounded-lg shadow-md sm:w-[350px] shrink">
      <CardContent>
        <div className=" flex flex-col py-4 ">
          <CardTitle className="sm:text-start text-bold text-2xl text-center text-neutral-200">
            Create Workspace
          </CardTitle>
          <CardDescription className="text-start text-neutral-400">
            Create a new workspace for your account
          </CardDescription>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <Label className="text-sm text-neutral-400">Workspace Name</Label>
            <Input
              name="workspace"
              placeholder="eg:new-workspace"
              type="text"
              value={value}
              disabled={isLoading || hasWorkspace}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className={cn("w-full bg-gray-200 rounded-md", {
              "bg-neutral-600": isLoading,
            })}
            disabled={isLoading || value.trim().length === 0 || hasWorkspace}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : hasWorkspace ? (
              <Check className="text-green-500" />
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
