"use client";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/custom/text-wrappers";
import PricingCards from "@/components/custom/pricing/pricing.cards";
import { siteConfig } from "@/config/site.config";
import BlurFade from "@/components/ui/blur-fade";
import PricingTable from "@/components/custom/pricing/pricing.table";
import PricingSwitch from "@/components/custom/pricing/pricing.switch";
import { useState } from "react";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="absolute inset-0 mx-auto h-full w-full bg-[radial-gradient(circle,rgba(211,211,211,0.1),rgba(18,20,22,0.05),rgba(18,20,22,0))] opacity-60" />
      <div className="px-8 md:px-12">
        <PageHeader className="flex items-center justify-center md:items-center">
          <BlurFade delay={0.2} inView>
            <PageHeaderHeading>
              {siteConfig.pricingPage.title}
            </PageHeaderHeading>
          </BlurFade>

          <BlurFade delay={0.2 * 2} inView>
            <PageHeaderDescription className="text-center">
              {siteConfig.pricingPage.desc}
            </PageHeaderDescription>
          </BlurFade>
        </PageHeader>

        <section
          id="pricingCards"
          className="flex items-center justify-center px-8 mb-20"
        >
          <BlurFade delay={0.2 * 3} inView>
            <div className="flex items-center justify-center mb-10">
              <PricingSwitch onYearlyBillingChange={setIsYearly} />
            </div>
            <PricingCards isYearly={isYearly} />
          </BlurFade>
        </section>

        <section
          id="pricingTable"
          className="flex items-center justify-center px-8 my-20 border-t-2 border-dashed w-full"
        >
          <BlurFade delay={0.2 * 4} inView>
            <PricingTable />
          </BlurFade>
        </section>
      </div>
    </div>
  );
}
