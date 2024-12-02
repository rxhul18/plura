'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import * as Avatar from '@radix-ui/react-avatar';
import Image from 'next/image';

type ContributorData = {
  login: string;
  id: number;
  avatar_url?: string;
  html_url?: string;
};

interface ContributorsGridProps {
  data: ContributorData[];
}

export default function ContributorsGrid({ data }: ContributorsGridProps) {
  return (
    <Tooltip.Provider>
      <div className="container mx-auto px-12 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((contributor) => (
            <Tooltip.Root key={contributor.id} delayDuration={200}>
              <Tooltip.Trigger asChild>
                <div className="flex items-center gap-4 bg-black p-3  rounded-lg hover:bg-gray-700 transition">
                  <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
                    {contributor.avatar_url ? (
                      <Image
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-700 text-white text-sm">
                        {contributor.login.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    )}
                  </Avatar.Root>
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-300 hover:text-blue-400"
                  >
                    {contributor.login}
                  </a>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="top"
                align="center"
                className="px-4 py-2 bg-black text-white text-sm rounded shadow-lg"
              >
                <div className="flex items-center">
                  <Avatar.Root className="w-8 h-8 rounded-full overflow-hidden mr-3">
                    {contributor.avatar_url ? (
                      <Image
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-700 text-white text-sm">
                        {contributor.login.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    )}
                  </Avatar.Root>
                  <div>
                    <p className="text-sm font-medium">{contributor.login}</p>
                    <a
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-xs"
                    >
                      View GitHub Profile
                    </a>
                  </div>
                </div>
                <Tooltip.Arrow className="fill-gray-800" />
              </Tooltip.Content>
            </Tooltip.Root>
          ))}
        </div>
      </div>
    </Tooltip.Provider>
  );
}
