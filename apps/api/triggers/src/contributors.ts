import { cache } from '@plura/cache';
import { logger, schedules } from '@trigger.dev/sdk/v3';

type ContributorData = {
  login: string;
  id: number;
  avatar_url?: string;
  html_url: string;
  contributions: number;
};

export const publishContributorsTask = schedules.task({
  id: "publish-contributors",
  cron: "0 0 * * 0", // Runs every Sunday at midnight
  maxDuration: 60,
  run: async () => {
    const owner = 'plura-ai';
    const repos = ['plura', 'docs', 'agents', 'chatbot'];
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    const MAX_PAGES = 50; // Limit total pages to prevent excessive API calls
    const redisKey = 'contributors';
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
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
              },
            }
          );

          const rateLimit = response.headers.get('x-ratelimit-remaining');
          if (rateLimit === '0') {
            logger.error(`GitHub API rate limit exceeded for ${repo}`);
            return [];
          }

          if (!response.ok) {
            logger.error(`GitHub API request failed for ${repo} with status ${response.status}`);
            return [];
          }

          const data = await response.json();
          if (data.length === 0) break;

          contributors = contributors.concat(
            data.filter((contributor: any) => !contributor.login.toLowerCase().includes('bot'))
          );
          page += 1;
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

      const finalContributors = Object.values(contributorsMap);

      await cache.del(redisKey); // Clear previous data
      await cache.rpush(redisKey, ...finalContributors.map((c) => JSON.stringify(c)));

      logger.log('Published contributors data', { finalContributors });
    } catch (error) {
      logger.error('Error processing contributors', { error });
      throw error;
    }
  },
});
