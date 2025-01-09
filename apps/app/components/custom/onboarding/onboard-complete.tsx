import { onboardingComplete } from "@/actions/session";
import { redirect } from "next/navigation";

export default async function OnboardComplete() {
   const res = await onboardingComplete()
   if(res.success){
     redirect("/settings")
   }
  return (
  <div>
    <h1 className="text-lg text-neutral-400">Your onbaording has been completed </h1>
  </div>);
}