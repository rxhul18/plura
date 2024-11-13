import { cache } from "@repo/cache";
import { prisma } from "@repo/db";
import { logger, schedules, wait } from "@trigger.dev/sdk/v3";

export const dbStatusTask = schedules.task({
  id: "db-status",
  // Every 3 minutes
  cron: "*/10 * * * *",
  maxDuration: 600,
  run: async (payload, { ctx }) => {
    const latencies: Record<string, number | null> = {};
    let totalLatency = 0;
    let operationCount = 0;

    const measureAndCacheLatency = async (operationName: string, operation: () => Promise<void>) => {
      const startTime = Date.now();
      try {
        await operation();
        const latency = Date.now() - startTime;
        latencies[operationName] = latency;
        totalLatency += latency;
        operationCount++;

        logger.log(`Latency for ${operationName}`, { latency });
      } catch (error) {
        logger.error(`${operationName} failed`, { error });
        latencies[operationName] = null; // Indicates failure
      }
    };

    // Mass Operations Count
    const massOperationsCount = 100;

    // Mass Creation
    await measureAndCacheLatency("mass_create", async () => {
      const createPromises = Array.from({ length: massOperationsCount }, (_, i) =>
        prisma.trigger.create({
          data: { id: `mass-${i}`, name: `Mass Test ${i}`, email: `mass${i}@test.com`, emailVerified: true },
        })
      );
      await Promise.all(createPromises);
    });

    await wait.for({ seconds: 10 });

    // Mass Read
    await measureAndCacheLatency("mass_read", async () => {
      await prisma.trigger.findMany({
        where: { id: { startsWith: "mass-" } },
      });
    });

    await wait.for({ seconds: 15 });

    // Mass Update
    await measureAndCacheLatency("mass_update", async () => {
      const updatePromises = Array.from({ length: massOperationsCount }, (_, i) =>
        prisma.trigger.update({
          where: { id: `mass-${i}` },
          data: { name: `Updated Mass Test ${i}`, emailVerified: false },
        })
      );
      await Promise.all(updatePromises);
    });

    await wait.for({ seconds: 10 });

    // Mass Deletion
    await measureAndCacheLatency("mass_delete", async () => {
      const deletePromises = Array.from({ length: massOperationsCount }, (_, i) =>
        prisma.trigger.delete({
          where: { id: `mass-${i}` },
        })
      );
      await Promise.all(deletePromises);
    });

    await wait.for({ seconds: 5 });

    const averageLatency = operationCount > 0 ? totalLatency / operationCount : null;
    const latencyRecord = {
      timestamp: new Date().toISOString(),
      latencies,
      totalLatency,
      operationCount,
      averageLatency,
      massOperationsCount,
    };

    await cache.rpush("db-latency:history", JSON.stringify(latencyRecord));

    // Trim the list to the last 100 entries to prevent unbounded growth
    await cache.ltrim("db-latency:history", -100, -1);

  },
});
