"use client";

import FeatureCard from "@/components/custom/features/feature.card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/custom/text-wrappers";
import BlurFade from "@/components/ui/blur-fade";

export default function Features() {
  return (
    <div className="flex flex-col items-center justify-center pb-8">
      <div className="absolute inset-0 mx-auto h-full w-full bg-[radial-gradient(circle,rgba(211,211,211,0.1),rgba(18,20,22,0.05),rgba(18,20,22,0))] opacity-60" />
      <PageHeader className="flex items-center justify-center md:items-center">
        <BlurFade delay={0.2} inView>
          <PageHeaderHeading>Features</PageHeaderHeading>
        </BlurFade>

        <BlurFade delay={0.2 * 2} inView>
          <PageHeaderDescription className="text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
            saepe earum delectus quas fuga eligendi voluptatem doloremque neque
            esse.
          </PageHeaderDescription>
        </BlurFade>
      </PageHeader>

      <BlurFade
        delay={0.2 * 3}
        inView
        className="w-full grid grid-cols-2 grid-rows-3  gap-6"
      >
        <FeatureCard className="col-span-2" />
        <FeatureCard className="row-span-2" />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard className="col-span-2" />
      </BlurFade>
    </div>
  );
}
