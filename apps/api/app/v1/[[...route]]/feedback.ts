import { Hono } from "hono";
const app = new Hono().get("/", (c) => {
    console.log("feedback")
  return c.json({
    message: "i am alive",
    status: 200,
  });
});

export default app;
