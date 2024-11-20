import { handle } from "hono/vercel";
import { Hono } from "hono";
import { auth as Auth } from "@repo/auth";
import { cors } from "hono/cors";
import mail from "./mail";
import hello from "./hello";
import session from "./session";
import auth from "./auth";
import status from "./status";

const allowedOrigins = [
  "http://localhost:3003",
  "https://www.plura.pro",
  "https://app.plura.pro",
];

export const runtime = "edge";

const app = new Hono<{
  Variables: {
    user: typeof Auth.$Infer.Session.user | null;
    session: typeof Auth.$Infer.Session.session | null;
  };
}>().basePath("/api");

app.use(
  "/auth/**",
  cors({
    origin: allowedOrigins,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);
app.use("*", async (c, next) => {
  const session = await Auth.api.getSession({ headers: c.req.raw.headers });

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

app.route("/session", session);
app.route("/hello", hello);
app.route("/mail", mail);
app.route("/auth", auth);
app.route("/status", status);

const GET = handle(app);
const POST = handle(app);
const PATCH = handle(app);
const DELETE = handle(app);
const OPTIONS = handle(app);

export { GET, PATCH, POST, DELETE, OPTIONS };
