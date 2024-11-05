"use client";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/custom/page-header";
import { Button } from "@/components/ui/button";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container relative">
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(211,211,211,0.15),rgba(255,255,255,0))]" />
      <PageHeader>
        {/* <Announcement /> */}
        <PageHeaderHeading>
          Build your own ai powered support system for your SAAS
        </PageHeaderHeading>
        <PageHeaderDescription>
          Empower your SAAS support service with your own AI agent. Let our
          intelligent assistant handle your customer queries, provide instant
          solutions, and enhance your customer satisfaction.
        </PageHeaderDescription>
        <PageActions>
          <Button size={"lg"} variant={"outline"}>
            <Link href="/docs">Get Started Free</Link>
          </Button>
          <RainbowButton>
            <Link target="_blank" rel="noreferrer" href={"#"}>
              Get Premium For $15
            </Link>
          </RainbowButton>
        </PageActions>
      </PageHeader>
      <section id="demo">
        <div className="relative">
          <HeroVideoDialog
            className="dark:hidden block"
            animationStyle="top-in-bottom-out"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
            thumbnailAlt="Hero Video"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="top-in-bottom-out"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
            thumbnailAlt="Hero Video"
          />
        </div>
      </section>
    </div>
  );
}
