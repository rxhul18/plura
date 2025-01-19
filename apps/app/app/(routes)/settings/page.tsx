import InfoBreadCrumb from "@/components/custom/infobar/bread-crumb";
import ApiSettings from "@/components/custom/settings/api.settings";
import ApiSkeleton from "@/components/custom/settings/api.skeleton";
import BillingSettings from "@/components/custom/settings/billing.settings";
import ThemeSettings from "@/components/custom/settings/theme.settings";
import {Suspense} from "react";

export default function SettingsPage() {

  return (
    <div className="flex flex-col h-full w-full items-start overflow-hidden px-5 md:px-2">
      <InfoBreadCrumb />
      <div className="flex flex-col gap-10">
        <BillingSettings />
        <ThemeSettings />
        <Suspense fallback={<ApiSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <ApiSettings />
        </Suspense>
      </div>
    </div>
  );
}
