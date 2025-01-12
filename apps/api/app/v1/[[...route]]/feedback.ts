import { zValidator } from "@hono/zod-validator";
import { feedbackSchema } from "@repo/types";
import { Hono } from "hono";
import { auth } from "@plura/auth";
import { prisma } from "@plura/db";


const app = new Hono()
.get("/", (c) => {
    console.log("feedback")
  return c.json({
    message: "i am alive",
    status: 200,
  });
})
.post("/", zValidator("json", feedbackSchema), async (c) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session?.user.id) {
      return c.json({ message: "unauthorized", status: 401 }, 401);
    }
    const body = c.req.valid("json");
    try {
      const feeback = await prisma.feedback.create({
        data: {
          userId: session.user.id,
          desc: body.desc,
          emotion: body.emotion
        },
      });
      return c.json({
        message: "Succesfully submited!",
      },200);
    } catch (error) {
      console.log(error);
    }
  })

export default app;
