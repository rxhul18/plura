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

export default function ApiSettings({project}:{project: Project}) {
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
        <h2 className="text-lg dark:text-black">Workspace ID</h2>
        <p className="mt-1 text-sm text-gray-500">
          This is your workspace ID. It's used in some API calls.
        </p>
        <ApiButton />
        <div className="mt-4 flex items-center gap-1">
          <div
            className={"rounded-md bg-secondary px-4 py-2 text-sm font-medium border"}
          >
            {/* <h2 className={`${!visible && "blur-[3px]"}`}>{workspaceID}</h2> */}
          </div>
          {/* <Button onClick={() => (setVisible(!visible))} className="border" variant="default">
            {visible ? <Eye /> : (
              <EyeOff />
            )}
          </Button> */}
        </div>
      </div>
    </div>
  )
}
