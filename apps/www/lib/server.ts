"use server";
import { headers } from "next/headers";

export const getMultipleSessions = async () => {
  const res = await fetch("http://localhost:3001/v1/multi-sessions", {
    headers: await headers(),
  });
  return res.json();
};

export const getSession = async () => {
  const res = await fetch("http://localhost:3001/v1/session", {
    headers: await headers(),
  });
  return res.json();
};
