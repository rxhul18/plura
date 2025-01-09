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

import { createProject } from "@/actions/project";

export default function ProjectForm({
  workspaceId,
  projectExists,
  existingProjectName,
}: {
  workspaceId: string;
  projectExists?: boolean;
  existingProjectName?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(existingProjectName ?? "");
  const { sendMessage } = useActions<typeof AI>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useUIState<typeof AI>();
  const [hasProject, setHasProject] = useState(projectExists);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    console.log(data.get("project"), workspaceId);
    const projectName = data.get("project") as string;

    try {
      setIsLoading(true);
      const res = await createProject({
        workspaceId: workspaceId,
        name: projectName,
      });
      setHasProject(true);
      return res;
    } catch (error) {
      toast.error(`Error creating workspace!Please try again `);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (hasProject) {
        const project = await sendMessage({
          prompt: "call onboardComplete tool",
        });
        setMessages((currentMessages) => [...currentMessages, project]);
      }
    })();
  }, [hasProject]);
  return (
    <Card className="bg-neutral-900/30 rounded-lg shadow-md sm:w-[350px] shrink">
      <CardContent>
        <div className=" flex flex-col py-4 ">
          <CardTitle className="sm:text-start text-bold text-2xl text-center text-neutral-200">
            Create Project
          </CardTitle>
          <CardDescription className="text-start text-neutral-400">
            Create a new project for your account
          </CardDescription>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <Label className="text-sm text-neutral-400">Project Name</Label>
            <Input
              name="project"
              placeholder="eg:new-workspace"
              type="text"
              value={value}
              disabled={isLoading || hasProject }
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className={cn("w-full bg-gray-200 rounded-md", {
              "bg-neutral-600": isLoading,
            })}
            disabled={isLoading || value.trim().length === 0 || hasProject}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : hasProject ? (
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
