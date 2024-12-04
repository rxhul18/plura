import {
  SectionHeader,
  SectionHeaderDescription,
  SectionHeaderHeading,
} from "@/components/custom/text-wrappers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";

export default function Contact() {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="absolute inset-0 mx-auto h-full w-full bg-[radial-gradient(circle,rgba(211,211,211,0.1),rgba(18,20,22,0.05),rgba(18,20,22,0))] opacity-60" />
      <div className="px-8 md:px-12">
        <div className="flex md:flex-row">
          <SectionHeader className="flex flex-col max-w-2xl">
            <SectionHeaderHeading>Contact support</SectionHeaderHeading>
            <SectionHeaderDescription>
              We are here to help. Ask product questions, report problems, or
              leave feedback.
            </SectionHeaderDescription>
          </SectionHeader>

          <Card className="w-3/6 m-10">Ok beb</Card>
        </div>
        <section className="w-full border-t-2 border-dashed py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 px-8 md:px-20">
            <Card className="border-none">
              <CardHeader>
                <CardTitle className="text-xl">Join the community</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  More than 10,000 Linear users share questions and best
                  practices in our Slack community.
                </p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>

            <Card className="border-none">
              <CardHeader>
                <CardTitle className="text-xl">Join the community</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  More than 10,000 Linear users share questions and best
                  practices in our Slack community.
                </p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>

            <Card className="border-none">
              <CardHeader>
                <CardTitle className="text-xl">Join the community</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  More than 10,000 Linear users share questions and best
                  practices in our Slack community.
                </p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </section>
  );
}
