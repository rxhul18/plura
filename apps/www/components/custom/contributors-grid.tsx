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
  github_link: string;
  contributions: number;
};

interface ContributorsGridProps {
  data: ContributorData[];
}

export default function ContributorsGrid({ data }: ContributorsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mt-10 mb-8 items-center justify-center">
      <TooltipProvider>
        {data.map((contributor, i) => (
          <Tooltip key={contributor.id}>
            <BlurFade delay={0.25 * i}>
              <TooltipTrigger>
                <div className="flex items-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-help">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      className="rounded-full grayscale"
                    />
                    <AvatarFallback>
                      {contributor.login.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm/2 select-none">
                    {contributor.login.toLowerCase()}
                  </p>
                </div>
              </TooltipTrigger>
            </BlurFade>
            <TooltipContent className="w-full px-3 py-2 border border-border/60 bg-secondary/20 backdrop-blur-lg supports-[backdrop-filter]:bg-secondary/30 dark:border-border rounded-2xl shadow-xl flex flex-col gap-2">
  <div className="flex flex-row items-center gap-3">
    {/* Avatar */}
    <Avatar className="w-10 h-10">
      <AvatarImage
        src={contributor.avatar_url}
        alt={contributor.login}
        className="rounded-full grayscale"
      />
      <AvatarFallback>
        {contributor.login.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>

    {/* Contributor Name */}
    <p className="text-primary font-medium text-sm">
      {contributor.login}
    </p>

    {/* GitHub Link */}
    <Link
      href={contributor.github_link}
      target="_blank"
      rel="noreferrer"
      className="ml-auto hidden md:flex items-center"
    >
      <div
        className={cn(
          buttonVariants({
            variant: "secondary",
          }),
          "h-8 w-8 flex items-center justify-center"
        )}
      >
        <Icons.gitHub className="h-5 w-5 fill-current" />
        <span className="sr-only">GitHub</span>
      </div>
    </Link>
  </div>

  {/* Contribution Badge */}
  <Badge variant="secondary" className="mt-1 text-sm gap-2">
    <p className="text-emerald-500">{contributor.contributions || "000"}+</p> contributions overall!
  </Badge>
</TooltipContent>

          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
