import { zValidator } from "@hono/zod-validator";
import { prisma } from "@plura/db";
import { Hono } from "hono";
import { workspaceSchema } from "@repo/types";
import { auth } from "@plura/auth";
import { cache } from "@plura/cache";
import { encrypt } from "@plura/crypt"

const CACHE_EXPIRY = 300; // Cache expiry time in seconds
const ENCRYPTION_KEY = new Uint8Array(JSON.parse(process.env.ENCRYPTION_KEY || '[]'));
type Workspace = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  invite_url: string | null;
  userId: string;
};

const app = new Hono()
  .get("/all", async (c) => {
    const cursor = c.req.query("cursor");
    const take = parseInt(c.req.query("take") || "10");
    const cacheKey = `workspaces:all:${cursor || "start"}:${take}`;
    let response: {
      nextCursor: string | null;
      workspaces: Workspace[];
    } | null = null;

    try {
      const cachedData: {
        nextCursor: string | null;
        workspaces: Workspace[];
      } | null = await cache.get(cacheKey);
      if (cachedData) {
        response = cachedData;
        console.log("Returned workspace list from cache");
      }
    } catch (error) {
      console.error("Cache parsing error (all):", error);
    }

    if (!response) {
      if (!c.req.url.includes("?cursor=")) {
        return c.redirect("?cursor=");
      }

      const workspaces: Workspace[] = await prisma.workspace.findMany({
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

      const nextCursor =
        workspaces.length > 0 ? workspaces[workspaces.length - 1].id : null;
      response = { nextCursor, workspaces };

      console.log("Fetched workspace list from database (all)");
      try {
        await cache.set(cacheKey, response, { ex: CACHE_EXPIRY });
      } catch (cacheError) {
        console.error(
          "Error storing workspace list in cache (all):",
          cacheError,
        );
      }
    }

    return c.json(response, 200);
  })
  .get("/:id", async (c) => {
    const workspaceId = c.req.param("id");
    if (!workspaceId) {
      return c.json({ message: "Missing workspace id", status: 400 }, 400);
    }

    const cacheKey = `workspace:${workspaceId}`;
    let workspace: Workspace | null = null;

    try {
      const cachedData: Workspace | null = await cache.get(cacheKey);
      if (cachedData) {
        workspace = cachedData;
        console.log("Returned workspace data from cache");
      }
    } catch (error) {
      console.error("Cache parsing error (by ID):", error);
    }

    if (!workspace) {
      workspace = await prisma.workspace.findUnique({
        where: {
          id: workspaceId,
        },
      });

      if (!workspace) {
        return c.json({ message: "Workspace not found", status: 404 }, 404);
      }

      console.log("Fetched workspace data from database (by ID)");
      try {
        await cache.set(cacheKey, workspace, { ex: CACHE_EXPIRY });
      } catch (cacheError) {
        console.error(
          "Error storing workspace data in cache (by ID):",
          cacheError,
        );
      }
    }

    return c.json({ workspace }, 200);
  })
  .get("/user/:userId", async (c) => {
    const userId = c.req.param("userId");
    if (!userId) {
      return c.json({ message: "Missing user id", status: 400 }, 400);
    }

    const cacheKey = `workspaces:user:${userId}`;
    let workspaces: Workspace[] | null = null;

    try {
      const cachedData: Workspace[] | null = await cache.get(cacheKey);
      if (cachedData) {
        workspaces = cachedData;
        console.log("Returned user workspaces from cache");
      }
    } catch (error) {
      console.error("Cache parsing error (user workspaces):", error);
    }

    if (!workspaces) {
      workspaces = await prisma.workspace.findMany({
        where: {
          userId: userId,
        },
      });

      if (workspaces.length === 0) {
        return c.json({ message: "Workspaces not found", status: 404 }, 404);
      }

      console.log("Fetched user workspaces from database");
      try {
        await cache.set(cacheKey, workspaces, { ex: CACHE_EXPIRY });
      } catch (cacheError) {
        console.error("Error storing user workspaces in cache:", cacheError);
      }
    }

    return c.json({ workspaces }, 200);
  })
  .post("/", zValidator("form", workspaceSchema), async (c) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    const userId = session?.user.id;
    const body = c.req.valid("form");

    if (!body) {
      return c.json({ message: "Missing body", status: 400 }, 400);
    }
    if (!userId) {
      return c.json({ message: "Missing user id", status: 400 }, 400);
    }
    const name =await encrypt(body.name, ENCRYPTION_KEY);

    const workspace = await prisma.workspace.create({
      data: {
        name: name.toString(),
        userId: userId,
      },
    });

    if (!workspace) {
      return c.json(
        { message: "failed to create workspace", status: 404 },
        404,
      );
    }

    // Invalidate cache for user workspaces
    const userWorkspacesCacheKey = `workspaces:user:${userId}`;
    try {
      await cache.del(userWorkspacesCacheKey);
      console.log(
        `Invalidated cache for user workspaces: ${userWorkspacesCacheKey}`,
      );
    } catch (cacheError) {
      console.error("Error invalidating user workspaces cache:", cacheError);
    }

    return c.json({ workspace }, 200);
  })
  .delete("/:id", async (c) => {
    const workspaceId = c.req.param("id");
    if (!workspaceId) {
      return c.json({ message: "Missing workspace id", status: 400 }, 400);
    }

    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session?.user.id) {
      return c.json({ message: "unauthorized", status: 401 }, 401);
    }

    const existingWorkspace = await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
        userId: session.user.id,
      },
    });
    if (!existingWorkspace) {
      return c.json({ message: "Workspace not found", status: 404 }, 404);
    }

    const workspace = await prisma.workspace.delete({
      where: {
        id: workspaceId,
        userId: session.user.id,
      },
    });

    // Invalidate cache for specific workspace and user workspaces
    const specificWorkspaceCacheKey = `workspace:${workspaceId}`;
    const userWorkspacesCacheKey = `workspaces:user:${session.user.id}`;

    try {
      await Promise.all([
        cache.del(specificWorkspaceCacheKey),
        cache.del(userWorkspacesCacheKey),
      ]);
      console.log(
        `Invalidated cache for workspace: ${specificWorkspaceCacheKey}`,
      );
      console.log(
        `Invalidated cache for user workspaces: ${userWorkspacesCacheKey}`,
      );
    } catch (cacheError) {
      console.error(
        "Error invalidating workspace and user workspaces cache:",
        cacheError,
      );
    }

    return c.json({ deletedWorkspace: workspace }, 200);
  });

export default app;
