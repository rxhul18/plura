import { Hono } from "hono";
import { cache } from "@repo/cache";

const app = new Hono();

app.get("/", async (c) => {
  const dbStatus = await cache.lrange("db-latency:history", 0, -1);
  const siteStatus = await cache.lrange("site-latency:history", 0, -1);
  return c.json({
    dbStatus,
    siteStatus,
  });
});

app.get("/db", async (c) => {
  const dbStatus = await cache.lrange("db-latency:history", 0, -1);
  return c.json({
    dbStatus,
  });
});

app.get("/site", async (c) => {
  const siteStatus = await cache.lrange("site-latency:history", 0, -1);
  return c.json({
    siteStatus,
  });
});

export default app;
