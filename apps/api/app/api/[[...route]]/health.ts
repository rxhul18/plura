import { Hono } from "hono";
const app = new Hono();
app.get("/", async (c) => {
  return c.json({
    message: "i am alive",
    status: 200,
  });
});

export default app
