import { auth } from "@repo/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
const allowedOrigins = [
  "http://localhost:3003",
  "https://www.plura.pro",
  "https://app.plura.pro",
];

const app = new Hono();
app.use(
  "/*",
  cors({
    origin: allowedOrigins,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);
app.get("/*", (c) => auth.handler(c.req.raw));
app.post("/*", (c) => auth.handler(c.req.raw));
export default app;
