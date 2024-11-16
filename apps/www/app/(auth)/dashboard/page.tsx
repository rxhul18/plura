"use client"
import AccountSwitcher from "@/components/custom/account-switcher";
import { authClient } from "@/lib/auth-client";
import { getMultipleSessions, getSession } from "@/lib/server";
import {Session} from "@repo/auth"
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";

export default  function page() {
  const [session, setSession] = useState<Session | null>(null);
  const [multipleSessions, setMultipleSessions] = useState<Session[] | null>(null)
 useEffect(() => {
   async function getData() {
     const session = await authClient.getSession();
     const multipleSessions =
       await authClient.multiSession.listDeviceSessions();
     setSession(session.data);
     setMultipleSessions(multipleSessions.data);
     console.log("i am here")
   }
   getData();
 }, []);
  return (
    <div>
      <AccountSwitcher session={multipleSessions} activeSession={session} />
    </div>
  );
}
