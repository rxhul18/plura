"use server";
import { headers } from "next/headers";
import { getSession } from "./session";

export const createWorkspace = async (workspaceName: string) => {
  const user = await getSession();
  if(!user){
    return
  }
  try {
    const workspace  = await fetch("http://localhost:3001/v1/workspace", {
        method: "POST",
        body:JSON.stringify({
          name: workspaceName,
        }),
    })
    console.log("workspace", workspace)
  } catch (error) {
    console.log("error", error);
  }
};