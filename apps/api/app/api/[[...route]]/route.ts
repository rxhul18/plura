import { prisma } from "@repo/db";
import { handle } from "hono/vercel";
import { Hono } from "hono";
import {auth} from "@repo/auth"
import { cors } from "hono/cors";
import mail from "./mail";

const allowedOrigins = [
  "http://localhost:3003",
  "https://www.plura.pro",
  "http://app.plura.pro",
];

export const runtime = "nodejs";


const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof  auth.$Infer.Session.session | null;
  };
}>().basePath("/api");


app.use(
  "/auth/**",
  cors({
    origin: ["http://localhost:3003", "https://www.plura.pro"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true
  })
);
app.options("/auth/**", (c) => {
  const origin = c.req.raw.headers.get("origin") ?? "";

  if (allowedOrigins.includes(origin)) {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "600",
      },
    });
  }

  return new Response("Forbidden", {
    status: 403,
  });
});
app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });


  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.get("/health", async (c) => {
  return c.json({
    message: "i am alive",
    status: 200,
  });
});
app.get("/session", async (c) => {
  const session = c.get("session");
  const user = c.get("user");

  if (!user) return c.body(null, 401);

  return c.json({
    session,
    user,
  });
});
app.route("/mail", mail)

app.on(["POST", "GET"], "/auth/**", (c) => {
  console.log(c.req.raw.headers.get("origin"));
  return auth.handler(c.req.raw);
});
app.get("/multi-sessions",async (c)=>{
  const res = await auth.api.listDeviceSessions({
    headers: c.req.raw.headers,
  })
  console.log(c.req.raw.headers.get("origin"));
  console.log(res.length)
  return c.json(res);
})
const GET = handle(app);
const POST = handle(app);
const PATCH = handle(app);
const DELETE = handle(app);
export const OPTIONS = handle(app);;

export { GET, PATCH, POST, DELETE };
