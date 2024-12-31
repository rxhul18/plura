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
 try {
   const response = await betterFetch<Session>(
     `${apiDomain}/v1/auth/get-session`,
     {
       baseURL: baseURL,
       headers: {
         cookie: (await headers()).get("cookie") || "",
       },
     }
   );
   return response.data;
 } catch (error) {
    return {error: "no session found"}
 }
 
  
}