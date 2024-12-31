import { Hono } from "hono";
import { cache } from "@plura/cache";

const app = new Hono().get("/", async (c) => {
  const contributorsData = await cache.lrange("contributors", 0, -1);
  return c.json({
    contributorsData,
  });
});

export default app;
