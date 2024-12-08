"use client";
import {
  SectionHeader,
  SectionHeaderDescription,
  SectionHeaderHeading,
} from "@/components/custom/text-wrappers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site.config";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

const accordionItems: AccordionItem[] = [
  {
    id: "01",
    title: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    id: "02",
    title: "Is it styled?",
    content:
      "Yes. It comes with default styles that matches the other components aesthetic.",
  },
  {
    id: "03",
    title: "Is it animated?",
    content:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export default function Method() {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const accordionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToItem = (itemId: string) => {
    const yOffset = -60;
    const element = accordionRefs.current[itemId];
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setOpenItem(itemId);
    } else {
      setOpenItem(undefined);
    }
  };

  const handleHash = () => {
    const hash = decodeURIComponent(
      window.location.hash.slice(1).toLowerCase()
    );
    const item = accordionItems.find(
      (item) => item.id === hash || item.title.toLowerCase() === hash
    );
    if (item) {
      scrollToItem(item.id);
    }
  };

  useEffect(() => {
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <section className="flex flex-col items-center md:items-start justify-center overflow-hidden w-full px-4 md:px-6">
      <section className="w-full px-2 md:px-5">
        <div className="flex flex-col md:flex-row">
          <SectionHeader className="flex flex-col max-w-2xl">
            <SectionHeaderHeading className="text-3xl md:text-4xl lg:text-5xl ">
              {siteConfig.methodPage.sectionA.title}
            </SectionHeaderHeading>
            <div className="w-full h-px bg-border" />
            <SectionHeaderDescription className="text-sm md:text-base -mt-2">
              {siteConfig.methodPage.sectionA.desc}
            </SectionHeaderDescription>
          </SectionHeader>
          <Card className="border-none mt-4 md:mt-auto md:flex rounded-2xl cursor-pointer">
            <Image
              src="/images/usagehome.jpg"
              alt="image"
              height={400}
              width={400}
              draggable={false}
              className="m-4 md:m-20 transition-all duration-200 hover:brightness-[0.8] grayscale rounded-2xl hover:grayscale-0 object-cover object-center shadow-lg"
            />
          </Card>
        </div>
      </section>
      <Accordion
        type="single"
        collapsible
        className="w-full items-center justify-center space-y-4 mb-16 px-2 md:px-24"
        value={openItem}
        onValueChange={setOpenItem}
      >
        {accordionItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="py-2"
            ref={(el: HTMLDivElement | null) => {
              if (el) accordionRefs.current[item.id] = el;
            }}
          >
            <AccordionTrigger className="hover:no-underline px-2 md:px-4 font-normal font-sans text-lg md:text-2xl group flex items-center">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToItem(item.id);
                }}
                className="text-muted-foreground/50 text-2xl md:text-3xl font-medium mr-2 md:mr-4 group-hover:text-primary/50 transition-colors flex-shrink-0 w-8 md:w-12"
              >
                {item.id}
              </span>
              <span className="flex-grow">{item.title}</span>
            </AccordionTrigger>
            <AccordionContent className="px-2 md:px-4 font-light font-sans text-base md:text-xl group flex items-center">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
