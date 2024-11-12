import { cache } from "@repo/cache";
import { prisma } from "@repo/db";
import { logger, schedules } from "@trigger.dev/sdk/v3";

export const dbStatusTask = schedules.task({
  id: "db-status",
  // Every 3 minutes
  cron: "*/3 * * * *",
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

    // Measure latencies for CRUD operations
    await measureAndCacheLatency("create", async () => {
      await prisma.trigger.create({
        data: { id: "6969", name: "Testing", email: "triggers@dev.com", emailVerified: true },
      });
    });

    await measureAndCacheLatency("read", async () => {
      await prisma.trigger.findFirst({
        where: { id: "6969" },
      });
    });

    await measureAndCacheLatency("update", async () => {
      await prisma.trigger.update({
        where: { id: "6969" },
        data: { name: "I Am Alive", emailVerified: false },
      });
    });

    await measureAndCacheLatency("delete", async () => {
      await prisma.trigger.delete({
        where: { id: "6969" },
      });
    });

    const averageLatency = operationCount > 0 ? totalLatency / operationCount : null;
    logger.log("Database Latency Report", { latencies, averageLatency });
    await cache.set("db-latency:overall", {
      totalLatency,
      operationCount,
      averageLatency,
    });

    const cachedLatencyData = await cache.get("db-latency:overall") as Record<string, unknown> | undefined;
    if (cachedLatencyData) {
      logger.log("Cached Overall Latency Data", cachedLatencyData);
    }

  },
});
