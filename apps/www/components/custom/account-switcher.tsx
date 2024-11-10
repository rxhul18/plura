"use client";
import { authClient } from "../../lib/auth-client";
import { Session } from "@repo/auth";
import { useRouter } from "next/navigation";
interface Props {
  session: Session[];
  activeSession: Session;
}
export default function AccountSwitcher({ session, activeSession }: Props) {
  const router = useRouter();
  const onSelect = async (sessionId: string) => {
    console.log(sessionId);
    const active = await authClient.multiSession.setActive({
      sessionId: sessionId,
    });

    console.log(active);
    router.refresh();
  };
  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <select
        onChange={(e) => onSelect(e.target.value)}
        value={activeSession.session.id}
        className="border-2 border-gray-300[0.3] rounded-md p-2"
      >
        {session.map((item) => {
          return (
            <option key={item.session.id} value={item.session.id}>
              {item.user.name}{" "}
            </option>
          );
        })}
      </select>
    </div>
  );
}
