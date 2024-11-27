"use client";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/custom/text-wrappers";
import PricingCards from "@/components/custom/pricing/pricing.cards";
import { siteConfig } from "@/config/site.config";
import BlurFade from "@/components/ui/blur-fade";

export default function Pricing() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="absolute inset-0 mx-auto h-full w-full bg-[radial-gradient(circle,rgba(211,211,211,0.1),rgba(18,20,22,0.05),rgba(18,20,22,0))] opacity-60" />
      <PageHeader className="flex items-center justify-center md:items-center">
          <BlurFade delay={0.2} inView>
            <PageHeaderHeading>{siteConfig.pricingPage.title}</PageHeaderHeading>
          </BlurFade>

          <BlurFade delay={0.2 * 2} inView>
            <PageHeaderDescription className="text-center">
              {siteConfig.pricingPage.desc}
            </PageHeaderDescription>
          </BlurFade>
      </PageHeader>

      <section id="pricing" className="flex items-center justify-center px-8 md:px-20">
      <BlurFade delay={0.2 * 3} inView>
      <PricingCards />
      </BlurFade>
      </section>
    </div>
  );
}
