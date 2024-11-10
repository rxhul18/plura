import { Hono } from "hono";
const app = new Hono()
import { prisma } from "@repo/db";
app
  .get("/hello", async (c) => {
    const test = await prisma.user.findMany();
    return c.json({
      test,
    });
  })
  .patch(async (c) => {
    const name = await c.req.json();
    const test = await prisma.user.update({
      where: {
        id: "123",
      },
      data: {
        name: name.name,
      },
    });
    return c.json({
      test,
    });
  })
  .delete(async (c) => {
    const test = await prisma.user.delete({
      where: {
        id: "2",
      },
    });
    return c.json({
      test,
    });
  })
  .post(async (c) => {
    const body = await c.req.json();
    console.log(body);
    const test = await prisma.user.create({
      data: body,
    });
    return c.json({
      test,
    });
  });

  export default app
