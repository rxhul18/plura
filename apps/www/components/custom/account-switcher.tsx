"use client";
import { authClient } from "@/lib/auth-client";
import { Session } from "@repo/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface Props {
  session: Session[] | null;
  activeSession: Session | null;
}
export default function AccountSwitcher({ session, activeSession }: Props) {
  const router = useRouter();
  const onSelect = async (token: string) => {
    console.log(token);
    const active = await authClient.multiSession.setActive({
      sessionToken: token,
    });

    console.log(active);
    window.location.reload();
  };
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth");
        },
        onError: (ctx) => {
          console.log("error", ctx.error);
        },
      },
    });
  };
 
  if (!activeSession || !session) {
    return <div>loading sessions</div>;
  }
   const handleCurrentSignOut = async () => {
     await authClient.multiSession.revoke({
       sessionToken: activeSession?.session.token
     });
     window.location.reload();
   };
  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <select
        onChange={(e) => onSelect(e.target.value)}
        value={activeSession.session.token}
        className="border-2 border-gray-300[0.3] rounded-md p-2"
      >
        {session.map((item) => {
          return (
            <option key={item.session.id} value={item.session.token}>
              {item.user.name}
            </option>
          );
        })}
      </select>
      <div
        className="flex border border-neutral-900[0.2] bg-neutral-900/60 p-2"
        onClick={handleSignOut}
      >
        Logout from all
      </div>
      <div
        className="flex border border-neutral-900[0.2] bg-neutral-900/60 p-2"
        onClick={handleCurrentSignOut}
      >
        Logout
      </div>
      <Link href={"/auth"}>
        <div className="flex border border-neutral-900[0.2] bg-neutral-900/60 p-2">
          Add Account
        </div>
      </Link>
    </div>
  );
}
