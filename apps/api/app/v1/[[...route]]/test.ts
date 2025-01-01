import { Hono } from "hono";
import { prisma } from "@plura/db";
import { checkAdmin } from "@/app/actions/checkAdmin";
import { checkLogin } from "@/app/actions/checkLogin";

const app = new Hono().use(checkLogin, checkAdmin).get("/", async (c) => {
  const user = await prisma.user.findMany();
  return c.json({
    user,
  });
});

export default app;
