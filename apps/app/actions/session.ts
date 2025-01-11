"use server";
import { betterFetch } from "@better-fetch/fetch";
import { Session } from "@plura/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const apiDomain =
  process.env.NODE_ENV === "production"
    ? "https://api.plura.pro"
    : "http://localhost:3001";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://app.plura.pro"
    : "http://localhost:3002";
export const getSession = async () => {
  try {
    const response = await betterFetch<Session>(
      `${apiDomain}/v1/auth/get-session`,
      {
        baseURL: baseURL,
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
export const onboardingComplete = async () => {
  try {

    const response = await betterFetch(
      `${apiDomain}/v1/user/onboarding-complete`,
      {
        method: "POST",
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
      }
    );
    if (!response.data) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
