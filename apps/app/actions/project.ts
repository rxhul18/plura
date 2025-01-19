/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { betterFetch } from "@better-fetch/fetch";
import { getSession } from "./session";
import { headers } from "next/headers";
import { Unkey } from "@unkey/api";
import { revalidatePath } from "next/cache";

const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://api.plura.pro/"
    : "http://localhost:3001";

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

export const createProject = async ({
  workspaceId,
  name,
}: {
  workspaceId: string;
  name: string;
}) => {
  const user = await getSession();
  if (!user) {
    return;
  }
  const project = await betterFetch(`${API_ENDPOINT}/v1/project`, {
    method: "POST",
    body: {
      workspaceId: workspaceId,
      name: name,
    },
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
  });

  return project;
};

export const getProjectOfUser = async (workspaceId: string) => {
  const user = await getSession();
  if (!user) {
    return;
  }
  try {
    const project: any = await betterFetch(
      `${API_ENDPOINT}/v1/project/workspace/` + workspaceId,
      {
        method: "GET",
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
      },
    );

    if (!project || !project?.data?.name) {
      return null;
    }
    console.log(project);
    return project;
  } catch (error) {}
};

export const curnProjectData = async({
  projectId
}:{
    projectId:string
}) => {
  const user = await getSession();
  if(!user){
    return;
  }
  console.log("projectId", projectId);

  const curnProject = await betterFetch<Project>(`${API_ENDPOINT}/v1/project/${projectId}`,{
    method: "GET",
    headers:{
      cookie: (await headers()).get("cookie") || "",
    }
  })
  console.log('logg', curnProject)
  return curnProject;
}

export const createProjectKey = async ({
  projectId,
  expire,
  ratetLimit,
  enabled
}:{
  projectId:string
  expire:number
  ratetLimit:number
  enabled:boolean
}) =>{
  const unkey = new Unkey({ rootKey: process.env.UNKEY_ROOT_KEY!});
  const user = await getSession();
  if(!user){
    return;
  }
  console.log("chal rha hai");
  
  const apiKey = await unkey.keys.create({
    apiId:process.env.UNKEY_API_KEY!,
    prefix:"plura",
    byteLength:16,
    ownerId:"chronark",
    meta:{
      hello: "world"
    },
    expires: 86400000 * expire,
    ratelimit: {
        type: "fast",
        duration: 1000,
        limit: ratetLimit,
    },
    remaining: 1000,
    refill: {
      interval: "monthly",
      amount: 100,
      refillDay: 15,
    },
    enabled: enabled
  })
  
  const projectKey = await betterFetch(`${API_ENDPOINT}/v1/project/api/${projectId}`,{
    method: "PUT",
    body:{
      projectId:projectId,
      apiKey:apiKey.result?.keyId
    },
    headers:{
      cookie: (await headers()).get("cookie") || "",
    }
  })
  console.log("projectKey", projectKey);
  revalidatePath("/settings");
  return projectKey;
}