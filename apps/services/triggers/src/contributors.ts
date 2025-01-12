import { cache } from "@plura/cache";
import { logger, schedules, wait } from "@trigger.dev/sdk/v3";

type ContributorData = {
  login: string;
  id: number;
  avatar_url?: string;
  html_url: string;
  contributions: number;
};

export const ContributorsData = schedules.task({
  id: "contributors",
  cron: "0 0 * * 1,4,7", // Runs at midnight on Monday, Thursday, and Sunday
  maxDuration: 60,
  run: async () => {
    const owner = "plura-ai";
    const repos = ["plura", "docs", "agents", "chatbot"];

    const MAX_PAGES = 50; // Limit total pages to prevent excessive API calls
    const redisKey = "contributors";
    const contributorsMap: Record<number, ContributorData> = {};

    const fetchContributors = async (repo: string) => {
      let contributors: ContributorData[] = [];
      let page = 1;
    
      try {
        do {
          if (page > MAX_PAGES) {
            logger.warn(`Reached maximum page limit of ${MAX_PAGES} for ${repo}`);
            break;
          }
    
          const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&page=${page}`,
            {
              headers: {
                Accept: "application/vnd.github.v3+json",
              },
            },
          );
    
          const rateLimit = response.headers.get("x-ratelimit-remaining");
          const rateLimitReset = response.headers.get("x-ratelimit-reset");
    
          if (rateLimit === "0") {
            const resetTime = Number(rateLimitReset) * 1000;
            const delayTime = resetTime - Date.now();
            logger.log(`Rate limit hit. Retrying after ${delayTime / 1000}s`);
            await wait.for({ seconds: delayTime / 1000 });
            continue; // Retry after delay
          }
    
          if (!response.ok) {
            const errorMessage = await response.json();
            logger.error(`GitHub API request failed for ${repo}`, {
              status: response.status,
              statusText: response.statusText,
              message: errorMessage.message,
            });
            return [];
          }
    
          const data = await response.json();
          if (data.length === 0) break;
    
          contributors = contributors.concat(
            data.filter(
              (contributor: any) => !contributor.login.toLowerCase().includes("bot"),
            ),
          );
    
          page += 1;
    
          // Wait for 20 seconds before the next API hit
          logger.log(`Waiting 20 seconds before the next request...`);
          await wait.for({ seconds: 20 });
        } while (page <= MAX_PAGES);
      } catch (error) {
        logger.error(`Error fetching contributors for ${repo}`, { error });
        throw error;
      }
    
      return contributors.map((contributor: any) => ({
        login: contributor.login,
        id: contributor.id,
        avatar_url: contributor.avatar_url,
        html_url: contributor.html_url,
        contributions: contributor.contributions,
      }));
    };
    

    try {
      // Fetch and process contributors for each repository
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

      // Create final array sorted by contributions in descending order
      const finalContributors = Object.values(contributorsMap).sort(
        (a, b) => b.contributions - a.contributions,
      );

      // Clear Redis list and push sorted array as a list
      await cache.del(redisKey); // Clear previous data
      await cache.rpush(
        redisKey,
        ...finalContributors.map((c) => JSON.stringify(c)),
      );

      logger.log("Published contributors data", { finalContributors });
    } catch (error) {
      logger.error("Error processing contributors", { error });
      throw error;
    }
  },
});
