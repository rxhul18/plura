"use client"
import ContributorsGrid from "@/components/custom/contributors-grid";
import {
  SectionHeader,
  SectionHeaderDescription,
  SectionHeaderHeading,
} from "@/components/custom/text-wrappers";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site.config";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type ContributorData = {
  login: string;
  id: number;
  avatar_url?: string;
  github_link: string;
};

export default function About() {
  const [contributors, setContributors] = useState<ContributorData[]>([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try{
      const response = await fetch("http://localhost:3001/api/contributors");
      const data = await response.json();
      console.log(data);
      setContributors(data.contributorsData);
      }catch (e){
        console.log(e);
      }
    };
    fetchContributors();
  }, []);



  return (
    <section className="flex flex-col items-center md:items-start justify-center overflow-hidden">
      <div className="absolute inset-0 mx-auto h-full w-full bg-[radial-gradient(circle,rgba(211,211,211,0.1),rgba(18,20,22,0.05),rgba(18,20,22,0))] opacity-60" />
      <div className="px-8 md:px-12">
        <SectionHeader>
          <SectionHeaderHeading className="text-3xl md:text-4xl">
            {siteConfig.aboutPage.title}
          </SectionHeaderHeading>
          <SectionHeaderDescription>
            {siteConfig.aboutPage.desc}
          </SectionHeaderDescription>
        </SectionHeader>
        <section className="w-full border-t-2 border-dashed">
          <div className="flex flex-row">
            <SectionHeader className="flex flex-col max-w-2xl">
              <SectionHeaderHeading className="text-3xl md:text-4xl">
                {siteConfig.aboutPage.team.title}
              </SectionHeaderHeading>
              <SectionHeaderDescription className="mt-0">
                {siteConfig.aboutPage.team.desc}
              </SectionHeaderDescription>
            </SectionHeader>

            <Card className="border-none mt-auto hidden md:flex rounded-2xl cursor-pointer">
              <Image
                src="/images/mypic4.jpg"
                alt="image"
                height={300}
                width={300}
                draggable={false}
                className="m-20 transition-all duration-200 hover:brightness-[0.8] grayscale rounded-2xl hover:grayscale-0 object-cover object-center shadow-lg border-2 p-1 border-dashed"
              />
            </Card>
            
          </div>
          <ContributorsGrid data={contributors}/>
        </section>
      </div>
    </section>
  );
}
