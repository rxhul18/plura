import React from "react";
import {
  SectionHeader,
  SectionHeaderDescription,
  SectionHeaderHeading,
} from "../text-wrappers";
import { siteConfig } from "@/config/site.config";
// import AgentsBento from "../bentos/agents-bento";

export default function AgentsSec() {
  return (
    <div className="relative flex-col w-screen items-center justify-center mt-40">
      <div className="absolute inset-0 mx-auto h-full w-full bg-[linear-gradient(to_bottom,rgba(18,20,22,1),rgba(18,20,22,0.8),rgba(18,20,22,0))]" />
      <div className="px-8 md:px-12">
        <SectionHeader className="flex flex-col z-50">
          <SectionHeaderHeading>
            {siteConfig.homePage.sections.agents.heading}
          </SectionHeaderHeading>
          <SectionHeaderDescription>
            {siteConfig.homePage.sections.agents.description}
          </SectionHeaderDescription>
        </SectionHeader>
        {/* <AgentsBento/> */}
      </div>
    </div>
  );
}
