import React from "react";
import Link from "next/link";
import {
  IconPuzzle,
  IconBolt,
  IconStack,
  IconTools,
  IconArrowRight,
} from "@tabler/icons-react";
import {
  SectionHeader,
  SectionHeaderDescription,
  SectionHeaderHeading,
} from "../text-wrappers";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

const widgetCards = [
  {
    title: "Customizable Widgets",
    description:
      "Build and customize widgets that fit your workflow perfectly. Enjoy the flexibility to adapt them as your needs evolve.",
    icon: IconPuzzle,
    href: "/features/widgets",
  },
  {
    title: "Quick Actions",
    description:
      "Execute common tasks with lightning-fast shortcuts. Save time and increase productivity with every click.",
    icon: IconBolt,
    href: "/features/quick-actions",
  },
  {
    title: "Widget Library",
    description:
      "Access a growing collection of pre-built widgets. Easily integrate them into your projects for rapid development.",
    icon: IconStack,
    href: "/features/library",
  },
  {
    title: "Developer Tools",
    description:
      "Essential tools to boost your development workflow. Streamline your processes and enhance collaboration with your team.",
    icon: IconTools,
    href: "/features/tools",
  },
];

export default function WidgetsSec() {
  return (
    <div className="relative w-full items-center justify-center my-40">
      <div className="absolute inset-0 mx-auto h-full w-full bg-[linear-gradient(to_bottom,rgba(18,20,22,1),rgba(18,20,22,0.8),rgba(18,20,22,0))]" />
      <div className="px-8 md:px-14">
        <SectionHeader className="flex flex-col z-50 mb-16">
          <SectionHeaderHeading>
            {siteConfig.homePage.sections.widgets.heading}
          </SectionHeaderHeading>
          <SectionHeaderDescription>
            {siteConfig.homePage.sections.widgets.description}
          </SectionHeaderDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 px-8 md:px-14 max-w-[86rem] mx-auto md:grid-cols-2 gap-4">
          {widgetCards.map((card, index) => (
            <div
              key={index}
              className="relative group h-[30rem] overflow-hidden backdrop-blur-sm rounded-3xl p-8 hover:bg-accent/10 transition-all duration-300 border border-accent/50"
            >
              {/* <card.icon className="w-10 h-10 text-primary mb-4" /> */}
              <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
              <div className="md:bottom-[-29rem] left-[50%] group-hover:opacity-100 opacity-0 z-[-1] absolute bg-gradient-to-t from-primary to-accent/90 blur-[6em] rounded-xl transition-all translate-x-[-50%] duration-500 ease-out w-[10rem] md:w-[30rem] h-[20rem] md:h-[32rem] rotate-[0deg]" />
              <Link
                href={card.href}
                className="text-primary group w-fit flex items-center gap-1 bg-accent text-xs border border-accent rounded-full px-3 mt-4 py-1 transition-all duration-300 hover:bg-primary hover:text-background"
              >
                <span className="font-semibold text-xs">Read More</span>{" "}
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
