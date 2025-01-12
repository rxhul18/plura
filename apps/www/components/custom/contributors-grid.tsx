import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import BlurFade from "../ui/blur-fade";
import { Badge } from "../ui/badge";

type ContributorData = {
  login: string;
  id: number;
  avatar_url?: string;
  html_url: string;
  contributions: number;
  name: string;
  twitter_username?: string;
};

interface ContributorsGridProps {
  data: ContributorData[];
}

export default function ContributorsGrid({ data }: ContributorsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mt-10 mb-8 px-10 items-center justify-center">
      <TooltipProvider>
        {data.map((contributor, i) => (
          <BlurFade key={contributor.id} delay={0.25 * i}>
            <Tooltip>
              <TooltipTrigger className="inline-flex items-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-help">
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    src={contributor.avatar_url || ""}
                    alt={contributor.login}
                    className="rounded-full grayscale"
                  />
                  <AvatarFallback>{contributor.login}</AvatarFallback>
                </Avatar>
                <p className="text-sm/3 select-none truncate">
                  {contributor.name ? contributor.name : contributor.login}
                </p>
              </TooltipTrigger>
              <TooltipContent className="w-full max-w-xs px-4 py-3 border border-border/60 bg-secondary/20 backdrop-blur-lg supports-[backdrop-filter]:bg-secondary/30 dark:border-border rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={contributor.avatar_url || ""}
                      alt={contributor.login}
                      className="rounded-full grayscale"
                    />
                    <AvatarFallback>
                      {contributor.login.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-primary font-medium text-sm">
                    {contributor.name ? contributor.name : contributor.login}
                  </p>
                  <div className="flex gap-1 ml-auto">
                    <Link
                      href={contributor.html_url || "#"}
                      target={contributor.html_url ? "_blank" : undefined}
                      rel={contributor.html_url ? "noreferrer" : undefined}
                      className="ml-auto hidden md:flex items-center"
                    >
                      <div
                        className={cn(
                          buttonVariants({
                            variant: "secondary",
                          }),
                          "h-8 w-8 flex items-center justify-center",
                        )}
                      >
                        <Icons.gitHub className="h-5 w-5 fill-current" />
                        <span className="sr-only">GitHub</span>
                      </div>
                    </Link>
                    {contributor.twitter_username && (
                      <Link
                        href={`https://x.com/${contributor.twitter_username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-auto hidden md:flex items-center"
                      >
                        <div
                          className={cn(
                            buttonVariants({
                              variant: "secondary",
                            }),
                            "h-8 w-8 flex items-center justify-center",
                          )}
                        >
                          <Icons.twitter className="h-5 w-5 fill-current" />
                          <span className="sr-only">X</span>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="mt-2 text-sm gap-2 w-full"
                >
                  <p className="text-emerald-500 font-bold">
                    {contributor.contributions || "000"}+
                  </p>
                  contributions in total!
                </Badge>
              </TooltipContent>
            </Tooltip>
          </BlurFade>
        ))}
      </TooltipProvider>
    </div>
  );
}
