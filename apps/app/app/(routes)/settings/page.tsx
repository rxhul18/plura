"use client";
import { curnProjectData } from "@/actions/project";
import InfoBreadCrumb from "@/components/custom/infobar/bread-crumb";
import ApiSettings from "@/components/custom/settings/api.settings";
import BillingSettings from "@/components/custom/settings/billing.settings";
import ThemeSettings from "@/components/custom/settings/theme.settings";

import { useEffect, useState } from "react";

interface ProjectT {
  id: string;
  name: string;
  slug: string;
  createdAt: string; // Use `string` for dates if they come as ISO strings from the backend
  updatedAt: string;
  workspaceId: string; // Define a Workspace interface separately
  userId: string;
  apiKey: string;
}

export default function SettingsPage() {
  const [proj, setProj] = useState<ProjectT | null>(null);

  useEffect(() => {
    console.log("effect started");
    if(!proj){
      const apiKeyStatus = async () => {
        console.log("started");
        const res = await curnProjectData(
          "27f0281c-716f-4f46-b1e8-c8661b5fc34b"
        )
        console.log('fuck:', res);
        setProj(res)
      };
    }
  }, [proj]);


  return (
    <div className="flex flex-col h-full w-full items-start overflow-hidden px-5 md:px-2">
      <InfoBreadCrumb />
      <div className="flex flex-col gap-10">
        <BillingSettings />
        <ThemeSettings />
        <ApiSettings project={proj} />
      </div>
    </div>
  );
}
