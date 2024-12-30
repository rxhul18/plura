"use server"
import { betterFetch } from "@better-fetch/fetch";
import { Session } from "@repo/auth";
import { headers } from "next/headers";

const apiDomain =
  process.env.NODE_ENV === "production"
    ? "https://api.plura.pro"
    : "http://localhost:3001";

const baseURL = process.env.NODE_ENV === "production" ? "https://app.plura.pro" : "http://localhost:3002";
export const getSession = async () => {

  const response = await betterFetch<Session>(`${apiDomain}/v1/get-session`, 
    {
      baseURL: baseURL,
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
  });
  return response.data
  
}