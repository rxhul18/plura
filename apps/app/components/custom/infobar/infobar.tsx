import React from "react";
import InfoBreadCrumb from "./bread-crumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Infobar() {
  return (
    <nav className="flex w-full items-start justify-between gap-4 mb-8">
      <div className="flex items-center">
        <SidebarTrigger />
      </div>
      <InfoBreadCrumb />
    </nav>
  );
}
