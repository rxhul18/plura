"use server";

import { betterFetch } from "@better-fetch/fetch";
import { getSession } from "./session";
import { headers } from "next/headers";

export const createProject = async ({ workspaceId, name }: { workspaceId: string, name: string }) => {
  const user = await getSession()
  if (!user) {
    return
  }
   const project = await betterFetch("http://localhost:3001/v1/project", {
     method: "POST",
     body: {
     workspaceId: workspaceId,
     name: name,
     },
     headers: {
       cookie: (await headers()).get("cookie") || "",
     },
   });

  return project
};


export const getProjectOfUser = async(workspaceId:string) => {
  const user = await getSession()
  if(!user){
    return 
  }
  try {
     const project:any = await betterFetch(
       "http://localhost:3001/v1/project/workspace/" + workspaceId,
       {
         method: "GET",
         headers: {
           cookie: (await headers()).get("cookie") || "",
         },
       }
     );


     if(!project || !project?.data?.name){ 
       return null
     }
     console.log(project)
     return project
  } catch (error) {
    
  }
}
