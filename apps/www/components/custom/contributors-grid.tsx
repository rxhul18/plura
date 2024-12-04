import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

type ContributorData = {
  login: string;
  id: number;
  avatar_url?: string;
  github_link: string;
};

interface ContributorsGridProps {
  data: ContributorData[];
}

export default function ContributorsGrid({ data }: ContributorsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 px-6 md:px-12 mb-8">
      <TooltipProvider>
        {data.map((contributor) => (
          <Tooltip key={contributor.id}>
            <TooltipTrigger>
              <div className="flex items-center gap-4 p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="rounded-full"
                  />
                  <AvatarFallback>
                    {contributor.login.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{contributor.login}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent className="w-64 p-4 bg-gray-800 text-white shadow-xl rounded-xl flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="rounded-full"
                  />
                  <AvatarFallback>
                    {contributor.login.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-semibold">{contributor.login}</p>
              </span>
              <a
                href={contributor.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 text-xs underline mt-2 mb-2"
              >
                View Profile
              </a>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
