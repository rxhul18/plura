import { cache } from '@repo/cache';
import ContributorsGrid from './Collaborators';

export default async function ContributorsGridWrapper() {
  let contributors: ContributorData[] = [];

  try {
    const BATCH_SIZE = 20;
    const redisKey = 'contributors';
    const rawData = await cache.lrange(redisKey, 0, BATCH_SIZE - 1);
    contributors = rawData.map(item => item as ContributorData);
  } catch (error) {
    console.error('Error fetching contributors from Redis:', error);
    return <div>Unable to load contributors. Please try again later.</div>;
  }

  return <ContributorsGrid data={contributors} />;
}
