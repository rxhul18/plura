import { handle } from "hono/vercel";
import { Hono } from "hono";
import mail from "./mail";
import test from "./test";
import session from "./session";
import auth from "./auth";
import status from "./status";
import health from "./health";
import user from "./user";
import contributors from "./contributors";
import { cors } from "hono/cors";
import workspace from "./workspace";

export const runtime = "edge";

const app = new Hono().basePath("/v1");

const allowedOrigins = [
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3004",
  "https://www.plura.pro",
  "https://app.plura.pro",
];

app.use(
  "*",
  cors({
    origin: allowedOrigins,
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.route("/health", health);
app.route("/session", session);
app.route("/test", test);
app.route("/mail", mail);
app.route("/auth", auth);
app.route("/status", status);
app.route("/user", user);
app.route("/contributors", contributors);
app.route("/workspace", workspace);

const GET = handle(app);
const POST = handle(app);
const PATCH = handle(app);
const DELETE = handle(app);
const OPTIONS = handle(app);

export { GET, PATCH, POST, DELETE, OPTIONS };
