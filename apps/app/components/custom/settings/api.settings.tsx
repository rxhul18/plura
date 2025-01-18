/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useState } from "react"
import { ApiButton } from "./apibutton"
import SectionLabel from "../section/section.label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { curnProjectData } from "@/actions/project"
// import { betterFetch } from "@better-fetch/fetch"

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
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const workspaceID = project?.apiKey;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectId = "27f0281c-716f-4f46-b1e8-c8661b5fc34b";
        const data = await curnProjectData({ projectId });
        if (!data) {
          setError("No project data found or user is not authenticated.");
        } else {
          console.log(data,"data");
          
          setProject(data?.data as Project);
        }
      } catch (err) {
        setError( "An error occurred while fetching the project data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
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
      <div className="border rounded-lg p-6 mt-5 bg-white shadow-md min-w-full max-w-lg">
        <h2 className="text-lg dark:text-black">API ID</h2>
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
  // return (
  //   <div className="w-full container">
  //     <h1>API Settings</h1>
  //     {project ? (
  //       <div>
  //         <p><strong>ID:</strong> {project.id}</p>
  //         <p><strong>Name:</strong> {project.name}</p>
  //         <p><strong>Slug:</strong> {project.slug}</p>
  //         <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleString()}</p>
  //         <p><strong>Updated At:</strong> {new Date(project.updatedAt).toLocaleString()}</p>
  //         <p><strong>Workspace ID:</strong> {project.workspaceId}</p>
  //         <p><strong>User ID:</strong> {project.userId}</p>
  //         <p><strong>API Key:</strong> {project.apiKey}</p>
  //       </div>
  //     ) : (
  //       <p>No project data found.</p>
  //     )}
  //   </div>
  // );
}

// export default function ApiSettings() {

  
// }
