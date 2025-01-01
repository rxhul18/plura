"use server";
import { headers } from "next/headers";
import { getSession } from "./session";
import { betterFetch } from "@better-fetch/fetch";

export const createWorkspace = async (workspaceName: string) => {
  const user = await getSession();
  if(!user){
    return
  }
  try {
    console.log("workspaceName", workspaceName);
    const workspace  = await betterFetch("http://localhost:3001/v1/workspace", {
        method: "POST",
        body:{
          name: workspaceName,
        },
        headers: {
          "cookie": (await (headers())).get("cookie") || "",
        }
    })
    console.log("workspace", workspace)
  } catch (error) {
    console.log("error", error);
  }
};