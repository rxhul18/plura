import { NextApiRequest, NextApiResponse } from 'next';
import { cache } from '@repo/cache';

type DummyData = {
  timestamp: string;
  message: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rawData = await cache.lrange("dummy-data:history", 0, -1);
    const data: DummyData[] = rawData.map((item) => JSON.parse(item));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
