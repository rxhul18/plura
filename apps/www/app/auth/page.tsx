import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IconBrandGoogle,
  IconBrandGithub,
  IconBrandDiscord,
} from "@tabler/icons-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function Auth() {
  return (
    <div className="flex flex-col h-full w-full lg:grid lg:grid-cols-2 overflow-hidden">
      <div className="flex flex-col items-center justify-center px-4 sm:px-8 py-8 lg:py-0">
        <Tabs defaultValue="signin" className="w-[350px] rounded-xl">
          <TabsList>
            <TabsTrigger value="signin">SignIn</TabsTrigger>
            <TabsTrigger value="signup">SignUp</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="border-none">
              <CardHeader className="p-2">
                <CardTitle className="font-bold text-xl">
                  Welcome to Plura Ai
                </CardTitle>
                <CardDescription>
                  SignIn to Plura and continue managing your saas!
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2">
                <div className="flex flex-row items-center justify-between">
                  <Button>
                    <IconBrandGoogle className="size-5" /> Google
                  </Button>
                  <Button>
                    {" "}
                    <IconBrandGithub className="size-5" /> GitHub
                  </Button>
                  <Button>
                    {" "}
                    <IconBrandDiscord className="size-5" /> Discord
                  </Button>
                </div>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-6 h-[1px] w-full" />
                <div className="flex flex-col w-full gap-2 items-center justify-between">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email" type="email" />
                  </div>

                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="pass">Password</Label>
                    <Input id="pass" placeholder="Password" type="email" />
                  </div>
                  <Button className="w-full mt-2">Continue</Button>
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="hover:bg-background"
                >
                  Forgot password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-none">
              <CardHeader className="p-2">
                <CardTitle className="font-bold text-xl">
                  Welcome to Plura Ai
                </CardTitle>
                <CardDescription>
                  SignIn to Plura and continue managing your saas!
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2">
                <div className="flex flex-row items-center justify-between">
                  <Button>
                    <IconBrandGoogle className="size-5" /> Google
                  </Button>
                  <Button>
                    {" "}
                    <IconBrandGithub className="size-5" /> GitHub
                  </Button>
                  <Button>
                    {" "}
                    <IconBrandDiscord className="size-5" /> Discord
                  </Button>
                </div>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-6 h-[1px] w-full" />
                <div className="flex flex-col w-full gap-2 items-center justify-between">
                  <div className="flex flex-row items-start justify-between gap-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="firstname">First Name</Label>
                      <Input
                        id="firstname"
                        placeholder="First Name"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="lastname">Last Name</Label>
                      <Input
                        id="lastname"
                        placeholder="Last Name"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email" type="email" />
                  </div>

                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="pass">Password</Label>
                    <Input id="pass" placeholder="Password" type="email" />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="cnfpass">Confirm Password</Label>
                    <Input
                      id="cnfpass"
                      placeholder="Confirm Password"
                      type="email"
                    />
                  </div>
                  <Button className="w-full mt-2">Continue</Button>
                </div>
              </CardContent>
              {/* <CardFooter className="p-0">
    <Button variant={"ghost"} size={"sm"} className="hover:bg-background">
      Forgot password
    </Button>
  </CardFooter> */}
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden md:flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center px-4 sm:px-8 py-8 lg:py-0">
          <span className="flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl">
            Talk to any website using okokoa sss okokokks sssss
          </span>
        </div>
      </div>

      <div className="hidden lg:block lg:absolute lg:top-0 lg:bottom-0 lg:left-1/2 lg:border-l lg:border-secondary" />
    </div>
  );
}
