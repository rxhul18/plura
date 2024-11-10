import AccountSwitcher from "@/components/custom/account-switcher";
import { getMultipleSessions, getSession } from "@/lib/server";

export default async function page() {
  const session = await getSession();
  const multipleSessions = await getMultipleSessions();
  return (
    <div>
      <AccountSwitcher session={multipleSessions} activeSession={session} />
      <pre className="font-sm">{JSON.stringify(session, null, 1)}</pre>
      <pre>{JSON.stringify(multipleSessions,null,2)}</pre>
    </div>
  );
}
