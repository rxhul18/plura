"use client";

import InfoBreadCrumb from "@/components/custom/infobar/bread-crumb";
import IntegrationsComponent from "../../../components/pages/integrations";

export default function IntegrationPage() {
  return (
    <div className="flex flex-col h-full w-full items-start overflow-hidden px-5 md:px-2">
      <InfoBreadCrumb />
      <IntegrationsComponent />
    </div>
  );
}
