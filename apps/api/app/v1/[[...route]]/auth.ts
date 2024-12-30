import { auth } from "@plura/auth";
import { Hono } from "hono";
import { auth as Auth } from "@plura/auth";

const app = new Hono<{
  Variables: {
    user: typeof Auth.$Infer.Session.user | null;
    session: typeof Auth.$Infer.Session.session | null;
  };
}>();

app.get("/*", (c) => auth.handler(c.req.raw));
app.post("/*", (c) => auth.handler(c.req.raw));
export default app;
