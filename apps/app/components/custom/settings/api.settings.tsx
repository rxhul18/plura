/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useState } from "react"
import { ApiButton } from "./apibutton"
import SectionLabel from "../section/section.label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { curnProjectData } from "@/actions/project"
import { Skeleton } from "@/components/ui/skeleton"

interface Project {
  id: string;
  name: string;
  slug: string;
  createdAt: string; // Use `string` for dates if they come as ISO strings from the backend
  updatedAt: string;
  workspaceId: string; // Define a Workspace interface separately
  userId: string;
  apiKey: string;
}

export default function ApiSettings() {
  const [project, setProject] = useState<Project | null>(null); // State to store the project
  const [loading, setLoading] = useState<boolean>(true); 
  const [visible, setVisible] = useState<boolean>(false);
  const workspaceID = project?.apiKey;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectId = "27f0281c-716f-4f46-b1e8-c8661b5fc34b";
        const data = await curnProjectData({ projectId });
        if (!data) {
          console.log(("No Current Project Data found"));
        } else {
          setProject(data?.data as Project);
        }
      } catch (err) {
        console.log("err",err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); 

  if (loading) {
    return (
      <div className="w-full container">
        <div className="flex items-start justify-between gap-4">
          <SectionLabel
              label="API Settings"
              msg="Next we will get you to create your first API. This is the API that you will be protecting with Unkey. You can create as many APIs as you like, but for now we’ll just create one"
            />
        </div>
        <div className="border rounded-lg p-6 mt-5 bg-secondary shadow-md min-w-full max-w-lg">
          <Skeleton className="h-6 w-1/4" /> 
          <Skeleton className="h-4 w-2/3 mt-2" /> 
          <div className="mt-4 flex items-center gap-4">
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full container">
      <div>
        <div className="flex items-start justify-between gap-4">
          <SectionLabel
            label="API Settings"
            msg="Next we will get you to create your first API. This is the API that you will be protecting with Unkey. You can create as many APIs as you like, but for now we’ll just create one"
          />
        </div>
      </div>
      <div className="border rounded-lg p-6 mt-5 bg-secondary shadow-md min-w-full max-w-lg">
        <h2 className="text-primary">API ID</h2>
        <p className="mt-1 text-sm text-gray-500">
          This is your api ID. It's used in some API calls.
        </p>
        {project?.apiKey === "" && (
          <ApiButton />
        )}
        {project?.apiKey !== "" && (
          <div className="mt-4 flex items-center gap-1">
            <div
              className={"rounded-md bg-secondary px-4 py-2 text-sm font-medium border"}
            >
              <h2 className={`${!visible && "blur-[3px]"}`}>{workspaceID}</h2>
            </div>
            <Button onClick={() => (setVisible(!visible))} className="border" variant="default">
              {visible ? <Eye /> : (
                <EyeOff />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
