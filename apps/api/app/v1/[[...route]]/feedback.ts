import { checkLogin } from "@/app/actions/checkLogin";
import { zValidator } from "@hono/zod-validator";
import { feedbackSchema } from "@repo/types";
import { Hono } from "hono";


// '/feedback/all' - get req 
// '/feedback/:id' - get req
// '/feedback' - post req

const app = new Hono()
  .use(checkLogin)
  .post("/send", zValidator("json", feedbackSchema), async (c) => {
    const { desc, emotion } = c.req.valid("json");
    const { data, error } = await sendFeedback(desc, emotion);
    if (error) {
        return c.json(
          {
            message: "Email sent failed",
          },
          400,
        );
      }
      return c.json(
        {
          message: "Email sent successfully",
          data,
        },
        200,
      );
    })
    .get((c) => {
      return c.json({
        message: "Mail api is alive",
        status: 200,
      });
    })
    .post("/send-batch", zValidator("json", feedbackBatchSchema), async (c) => {