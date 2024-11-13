import AccountSwitcher from "@/components/custom/account-switcher";
import { getMultipleSessions, getSession } from "@/lib/server";

export default async function page() {
  const session = await getSession();
  const multipleSessions = await getMultipleSessions();
  return (
    <div>
      <AccountSwitcher session={multipleSessions} activeSession={session} />
    </div>
  );
}
