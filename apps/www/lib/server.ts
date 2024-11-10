"use server";
<<<<<<< HEAD
=======
import { auth } from "@repo/auth";
>>>>>>> 5b4aadf (add better-auth in hono)
import { headers } from "next/headers";

export const getMultipleSessions = async () => {
  const res = await fetch("http://localhost:3001/api/multi-sessions", {
    headers: await headers(),
  });
  return res.json();
};

export const getSession = async () => {
  const res = await fetch("http://localhost:3001/api/session", {
    headers: await headers(),
  });
  return res.json();
<<<<<<< HEAD
};
=======
}
>>>>>>> 5b4aadf (add better-auth in hono)
