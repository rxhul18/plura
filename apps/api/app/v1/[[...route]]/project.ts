import { zValidator } from "@hono/zod-validator";
import { prisma } from "@plura/db";
import { Hono } from "hono";
import { projectSchema } from "@repo/types";
import { auth } from "@plura/auth";
import { cache } from "@plura/cache";
import { encrypt } from "@plura/crypt";


const CACHE_EXPIRY = 300; 
const ENCRYPTION_KEY = new Uint8Array(
  JSON.parse(process.env.ENCRYPTION_KEY || "[]"),
);


const app = new Hono()
 .get("/all", async (c)=> {
   const cursor = c.req.query("cursor");
   const take = parseInt(c.req.query("take") || "10");
   const session = await auth.api.getSession({
     headers: c.req.raw.headers,
   });

   try{
    const projects = await prisma.project.findMany({
      take,
      skip: 1,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      orderBy: {
        createdAt: "asc",
      },
    });
    return c.json(projects,200);
   }catch(error){
   return c.json({message: "Error fetching projects", status: 400}, 400);
   }
 }).post("/", zValidator("json", projectSchema), async (c) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  if (!session?.user.id) {
    return c.json({ message: "unauthorized", status: 401 }, 401);
  }
  const body = c.req.valid("json");
  const project = await prisma.project.create({
    data: {
      name: body.name,
      ownerId: session.user.id,
      slug: body.slug,
      workspaceId: body.workspaceId,
    },
  });
  return c.json({ project }, 200);
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
      ownerId: session.user.id,
    },
  });
  if (!existingProject) {
    return c.json({ message: "Project not found", status: 404 }, 404);
  }

  const project = await prisma.project.delete({
    where: {
      id: projectId,
      ownerId: session.user.id,
    },
  });

  return c.json({ deletedProject: project }, 200);
});

export default app;
