/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { betterFetch } from "@better-fetch/fetch";
import { getSession } from "./session";
import { headers } from "next/headers";
import { Unkey } from "@unkey/api";

const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://api.plura.pro/"
    : "http://localhost:3001";

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

  const curnProject = await betterFetch(`${API_ENDPOINT}/v1/project/${projectId}`,{
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
  const apiKey = await unkey.keys.create({
    apiId:process.env.UNKEY_API_ID!,
    prefix:"plura",
    byteLength:16,
    ownerId:"chronark",
    meta:{
      hello: "world"
    },
    expires: 86400000*expire,
    ratelimit: {
        type: "async",
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
  console.log({
    projectId:projectId,
    apiKey:apiKey.result?.key
  },"Sdfasdf");
  
  const projectKey = await betterFetch(`${API_ENDPOINT}/v1/project/api/${projectId}`,{
    method: "PUT",
    body:{
      projectId:projectId,
      apiKey:apiKey.result?.key
    },
    headers:{
      cookie: (await headers()).get("cookie") || "",
    }
  })
  return projectKey;
}