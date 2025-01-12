"use server";

import { betterFetch } from "@better-fetch/fetch";
import { getSession } from "./session";
import { headers } from "next/headers";


const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://api.plura.pro/"
    : "http://localhost:3001";

export const createFeedback = async ({
  desc,
  emotion
}: {
  desc: string;
  emotion: string;
}) => {
  const user = await getSession();
  if (!user) {
    return;
  }
  const feedback = await betterFetch(`${API_ENDPOINT}/v1/feedback`, {
    method: "POST",
    body: {
      desc:desc,
      emotion:emotion
    },
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
  });

  return feedback;
};