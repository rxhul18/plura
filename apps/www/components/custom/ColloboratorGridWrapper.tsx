import { cache } from '@repo/cache';
import ContributorsGrid from './Colloborators';

export default async function ContributorsGridWrapper() {
  let contributors = [];

  try {
    const redisKey = 'contributors';
    const rawData = await cache.lrange(redisKey, 0, -1);
    contributors = rawData
  } catch (error) {
    console.error('Error fetching contributors from Redis:', error);
  }

  return <ContributorsGrid data={contributors} />;
}
