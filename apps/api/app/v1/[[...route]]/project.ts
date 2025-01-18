import { zValidator } from "@hono/zod-validator";
import { prisma } from "@plura/db";
import { Hono } from "hono";
import { projectApiSchema, projectSchema } from "@repo/types";
import { auth } from "@plura/auth";
import { cache } from "@plura/cache";
import { nanoid } from "nanoid";
import { Unkey } from "@unkey/api";

const unkey = new Unkey({ rootKey: "<UNKEY_ROOT_KEY>" });

const CACHE_EXPIRY = 300;
const app = new Hono()
  .get("/workspace/:workspaceId", async (c) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session) {
      return c.json({ message: "Unauthorized", status: 401 }, 401);
    }
    const workspaceId = c.req.param("workspaceId");
    if (!workspaceId) {
      return c.json({ message: "Missing workspace id", status: 400 }, 400);
    }
    try {
      const projects = await prisma.project.findMany({
        where: {
          workspaceId: workspaceId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      return c.json(projects, 200);
    } catch (error) {
      return c.json({ message: "Error fetching projects", status: 400 }, 400);
    }
  })
  .get("/:projectid", async(c)=>{
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    console.log(session, "headers");
    if (!session) {
      return c.json({ message: "Unauthorized", status: 401 }, 401);
    }
    const projectId = c.req.param("projectid");
    if(!projectId){
      return c.json({ message: "Missing project id", status: 400 }, 400);
    }
    try{
      const project = await prisma.project.findUnique({
        where:{
          id: projectId
        }
      })
      return c.json(project, 200);
    } catch(error){
      return c.json({ message: "Error fetching project", status: 400 }, 400);
    }
  })
  .put("/api/:projectid", zValidator("json", projectApiSchema), async (c) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session) {
      return c.json({ message: "Unauthorized", status: 401 }, 401);
    }
    console.log(session, "headers");
    const projectId = c.req.param("projectid");
    const body = c.req.valid("json");
    if(!projectId){
      return c.json({ message: "Missing project id", status: 400 }, 400);
    }
    try{
      const apiKey = await unkey.keys.create({
        apiId:"api_7oKUUscTZy22jmVf9THxDA",
        prefix:"xyz",
        byteLength:16,
        ownerId:"chronark",
        meta:{
          hello: "world"
        },
        expires: 1686941966471,
        ratelimit: {
            type: "async",
            duration: 1000,
            limit: 10,
        },
        remaining: 1000,
          refill: {
            interval: "monthly",
            amount: 100,
            refillDay: 15,
          },
        enabled: true
      })      

      const project = await prisma.project.update({
        where: { id: projectId },
        data: { apiKey: apiKey.result?.key }
      })
      return c.json(project, 200);
    } catch(error){
      return c.json({ message: "Error fetching project", status: 400 }, 400);
    }
  })
  .post("/", zValidator("json", projectSchema), async (c) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session?.user.id) {
      return c.json({ message: "unauthorized", status: 401 }, 401);
    }
    const body = c.req.valid("json");
    try {
      const project = await prisma.project.create({
        data: {
          name: body.name,
          userId: session.user.id,
          slug: nanoid(),
          workspaceId: body.workspaceId,
        },
      });
      return c.json({ project }, 200);
    } catch (error) {
      console.log(error);
    }
  })
  .delete("/:id", async (c) => {
    const projectId = c.req.param("id");
    if (!projectId) {
      return c.json({ message: "Missing project id", status: 400 }, 400);
    }

    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session?.user.id) {
      return c.json({ message: "unauthorized", status: 401 }, 401);
    }

    const existingProject = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    });
    if (!existingProject) {
      return c.json({ message: "Project not found", status: 404 }, 404);
    }

    const project = await prisma.project.delete({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    });

    return c.json({ deletedProject: project }, 200);
  });

export default app;
