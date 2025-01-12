import { zValidator } from "@hono/zod-validator";
import { feedbackSchema } from "@repo/types";
import { Hono } from "hono";
import { auth } from "@plura/auth";
import { prisma } from "@plura/db";
import { checkLogin } from "@/app/actions/checkLogin";
import { checkAdmin } from "@/app/actions/checkAdmin";

const app = new Hono()
  .use(checkLogin, checkAdmin)
  .get("/all", async (c) => {
    try {
      const feedbacks = await prisma.feedback.findMany();
      return c.json(
        {
          message: "All feedback retrieved successfully",
          data: feedbacks,
        },
        200,
      );
    } catch (error) {
      console.error("Error fetching all feedback:", error);
      return c.json(
        {
          message: "Error fetching feedback",
          status: 500,
        },
        500,
      );
    }
  })
  .get("/:id", async (c) => {
    const userId = c.req.param("id");
    if (!userId) {
      return c.json(
        {
          message: "User ID is required",
          status: 400,
        },
        400,
      );
    }
    try {
      const feedbacks = await prisma.feedback.findMany({
        where: {
          userId: userId,
        },
      });
      if (feedbacks.length === 0) {
        return c.json(
          {
            message: "No feedback found for this user",
            status: 404,
          },
          404,
        );
      }
      return c.json(
        {
          message: "Feedback retrieved successfully",
          status: 200,
          data: feedbacks,
        },
        200,
      );
    } catch (error) {
      console.error("Error fetching feedback:", error);
      return c.json(
        {
          message: "Error fetching feedback",
          status: 500,
        },
        500,
      );
    }
  })
  .post("/", zValidator("json", feedbackSchema), async (c) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session?.user.id) {
      return c.json({ message: "Unauthorized", status: 401 }, 401);
    }
    const body = c.req.valid("json");
    try {
      await prisma.feedback.create({
        data: {
          userId: session.user.id,
          desc: body.desc,
          emotion: body.emotion,
        },
      });
      return c.json(
        {
          message: "Successfully submitted!",
        },
        200,
      );
    } catch (error) {
      console.error("Error creating feedback:", error);
      return c.json(
        {
          message: "Error submitting feedback",
          status: 500,
        },
        500,
      );
    }
  });

export default app;
