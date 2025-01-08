import { Hono } from "hono";
import { prisma } from "@plura/db";
import { auth } from "@plura/auth";
import { cache } from "@plura/cache";

const CACHE_EXPIRY = 300; // Cache expiry time in seconds

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  isOnboarding: boolean;
};

const app = new Hono()
  .get("/self", async (c) => {
    const currentUser = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!currentUser) {
      return c.json(
        {
          message: "Oops! seems like your session is expired",
          status: 400,
        },
        400,
      );
    }

    const cacheKey = `user:self:${currentUser.user.id}`;
    let user: User | null = null;

    try {
      const cachedData: User | null = await cache.get(cacheKey);
      if (cachedData) {
        user = cachedData;
        console.log("Returned user data from cache");
      }
    } catch (error) {
      console.error("Cache parsing error (self):", error);
    }

    if (!user) {
      user = await prisma.user.findUnique({
        where: {
          id: currentUser.user.id,
        },
      });

      if (user) {
        console.log("Fetched user data from database (self)");
        try {
          await cache.set(cacheKey, user, { ex: CACHE_EXPIRY });
        } catch (cacheError) {
          console.error("Error storing user data in cache (self):", cacheError);
        }
      }
    }

    return c.json({ user }, 200);
  })
  .get("/all", async (c) => {
    const cursor = c.req.query("cursor");
    const take = parseInt(c.req.query("take") || "10");
    const cacheKey = `users:all:${cursor || "start"}:${take}`;
    let response: { nextCursor: string | null; users: User[] } | null = null;

    try {
      const cachedData: { nextCursor: string | null; users: User[] } | null =
        await cache.get(cacheKey);
      if (cachedData) {
        response = cachedData;
        console.log("Returned user list from cache");
      }
    } catch (error) {
      console.error("Cache parsing error (all):", error);
    }

    if (!response) {
      if (!c.req.url.includes("?cursor=")) {
        return c.redirect("?cursor=");
      }

      const users: User[] = await prisma.user.findMany({
        take,
        skip: 1,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
      });

      const nextCursor = users.length > 0 ? users[users.length - 1].id : null;
      response = { nextCursor, users };

      console.log("Fetched user list from database (all)");
      try {
        await cache.set(cacheKey, response, { ex: CACHE_EXPIRY });
      } catch (cacheError) {
        console.error("Error storing user list in cache (all):", cacheError);
      }
    }

    return c.json(response, 200);
  })
  .get("/:id", async (c) => {
    const userId = c.req.param("id");
    if (!userId) {
      return c.json({
        message: "User ID is required",
        status: 400,
      });
    }

    const cacheKey = `user:${userId}`;
    let user: User | null = null;

    try {
      const cachedData: User | null = await cache.get(cacheKey);
      if (cachedData) {
        user = cachedData;
        console.log("Returned user data from cache (by ID)");
      }
    } catch (error) {
      console.error("Cache parsing error (by ID):", error);
    }

    if (!user) {
      user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user) {
        console.log("Fetched user data from database (by ID):");
        try {
          await cache.set(cacheKey, user, { ex: CACHE_EXPIRY });
        } catch (cacheError) {
          console.error(
            "Error storing user data in cache (by ID):",
            cacheError,
          );
        }
      }
    }

    return c.json({ user }, 200);
  })
  .post("/onboarding-complete", async (c) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session?.user.id) {
      return c.json({ message: "unauthorized", status: 401 }, 401);
    }
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        isOnboarding: true,
      },
    });
    return c.json({ user }, 200);
  });

export default app;
