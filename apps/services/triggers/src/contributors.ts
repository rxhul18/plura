import { cache } from "@plura/cache";
import { logger, schedules, wait } from "@trigger.dev/sdk/v3";

type ContributorData = {
  login: string;
  id: number;
  avatar_url?: string;
  html_url: string;
  contributions: number;
  name?: string;
  twitter_username?: string;
};

export const ContributorsData = schedules.task({
  id: "contributors-data",
  cron: "0 0 * * 1,4,7",
  maxDuration: 60,
  run: async () => {
    const owner = "plura-ai";
    const repos = ["plura", "docs", "agents", "chatbot"];
    const MAX_PAGES = 50;
    const redisKey = "contributors";
    const contributorsMap: Record<number, ContributorData> = {};

    const fetchContributors = async (repo: string) => {
      let contributors: ContributorData[] = [];
      let page = 1;

      try {
        do {
          if (page > MAX_PAGES) break;

          const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&page=${page}`,
            {
              headers: {
                Accept: "application/vnd.github.v3+json",
              },
            }
          );

          const rateLimit = response.headers.get("x-ratelimit-remaining");
          const rateLimitReset = response.headers.get("x-ratelimit-reset");

          if (rateLimit === "0") {
            const resetTime = Number(rateLimitReset) * 1000;
            const delayTime = resetTime - Date.now();
            await wait.for({ seconds: delayTime / 1000 });
            continue;
          }

          if (!response.ok) return [];

          const data = await response.json();
          if (data.length === 0) break;

          contributors = contributors.concat(
            data.filter(
              (contributor: any) => !contributor.login.toLowerCase().includes("bot")
            )
          );

          page += 1;
          await wait.for({ seconds: 20 });
        } while (page <= MAX_PAGES);
      } catch {
        return [];
      }

      return contributors.map((contributor: any) => ({
        login: contributor.login,
        id: contributor.id,
        avatar_url: contributor.avatar_url,
        html_url: contributor.html_url,
        contributions: contributor.contributions,
      }));
    };

    const fetchAdditionalUserData = async (login: string) => {
      await wait.for({ seconds: 5 });
      try {
        const response = await fetch(`https://api.github.com/users/${login}`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!response.ok) return {};
        const data = await response.json();
        return {
          name: data.name || null,
          twitter_username: data.twitter_username || null,
        };
      } catch {
        return {};
      }
    };

    try {
      for (const repo of repos) {
        const repoContributors = await fetchContributors(repo);

        repoContributors.forEach((contributor) => {
          const existingContributor = contributorsMap[contributor.id];
          if (existingContributor) {
            existingContributor.contributions += contributor.contributions;
          } else {
            contributorsMap[contributor.id] = { ...contributor };
          }
        });
      }

      const finalContributors = await Promise.all(
        Object.values(contributorsMap).map(async (contributor) => {
          const additionalData = await fetchAdditionalUserData(contributor.login);
          return { ...contributor, ...additionalData };
        })
      );

      finalContributors.sort((a, b) => b.contributions - a.contributions);

      await cache.del(redisKey);
      await cache.rpush(redisKey, ...finalContributors.map((c) => JSON.stringify(c)));

      logger.log("Published updated contributors data with additional fields", {
        finalContributors,
      });
    } catch {
      throw new Error("Error processing contributors");
    }
  },
});
