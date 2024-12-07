import { zValidator } from "@hono/zod-validator"
import { prisma } from "@repo/db"
import { Hono } from "hono"
import { workspaceSchema } from "@repo/types"
import { auth } from "@repo/auth"
import { getSession } from "@/lib/session"

const app = new Hono()
.get("/:id", async(c) => {
  const workspaceId = c.req.param("id")
  if (!workspaceId) {
    return c.json({ message: "missing workspace id" }, 400)
  }
  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId,
    },
  })
  if (!workspace) {
    return c.json({ message: "workspace not found" }, 404)
  }
  return c.json({
    workspace
  },200)
})
.get("/user/:userId", async(c) => {
  const userId = c.req.param("userId")
  if (!userId) {
    return c.json({ message: "missing user id" }, 400)
  }
  const workspaces = await prisma.workspace.findMany({
    where: {
      userId: userId,
    },
  })
  if (!workspaces) {
    return c.json({ message: "workspaces not found" }, 404)
  }
  return c.json({
    workspaces
  },200)
})
.post("/",zValidator("form",workspaceSchema), async(c) => {
  const userId = (await getSession(c.req.raw))?.user.id
  const body = c.req.valid("form")
  
  if (!body) {
    return c.json({ message: "missing body" }, 400)
  }
  if (!userId) {
    return c.json({ message: "missing user id" }, 400)
  }
  const workspace = await prisma.workspace.create({
    data: {
      name: body.name,
      userId: userId,
    },
  })
  if (!workspace) {
    return c.json({ message: "workspace not found" }, 404)
  }
  return c.json({
    workspace
  },200)
})
.delete("/:id", async(c) => {
  const workspaceId = c.req.param("id")
  if (!workspaceId) {
    return c.json({ message: "missing workspace id" }, 400)
  }
  const workspace = await prisma.workspace.delete({
    where: {
      id: workspaceId,
    },
  })
  if (!workspace) {
    return c.json({ message: "workspace not found" }, 404)
  }
  return c.json({
    message: "workspace deleted successfully",
    deletedWorkspace: workspace 
  },200)
})


export default app