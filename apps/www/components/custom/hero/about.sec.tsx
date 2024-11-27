import React from "react";
import {
  SectionActions,
  SectionHeader,
  SectionHeaderDescription,
  SectionHeaderHeading,
} from "../text-wrappers";
import { TiltSpotlight } from "./about.card";
import { siteConfig } from "@/config/site.config";

export default function AboutSection() {
  return (
    <div className="relative flex-col items-center justify-center">
      <div className="absolute inset-0 mx-auto h-full w-full bg-[radial-gradient(circle,rgba(211,211,211,0.1),rgba(18,20,22,0.05),rgba(18,20,22,0))] opacity-60" />
      <div className="px-8 md:px-12">
        <SectionHeader>
          <SectionHeaderHeading>
            {siteConfig.homePage.sections.about.heading}
          </SectionHeaderHeading>
          <SectionHeaderDescription>
            {siteConfig.homePage.sections.about.description}
          </SectionHeaderDescription>
        </SectionHeader>

        <SectionActions className="flex md:flex-row flex-col">
          <TiltSpotlight />
          <TiltSpotlight />
          <TiltSpotlight />
        </SectionActions>
      </div>
    </div>
  );
}
