import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "@repo/db";
import { DELETE, GET, PATCH, POST } from "@/app/api/[[...route]]/route";

vi.mock("@repo/db", () => ({
  prisma: {
    user: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("API Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("POST /api/hello should create a new user", async () => {
    // Mock the response of prisma.user.create
    const newUser = { id: "123", name: "New User" };
    prisma.user.create.mockResolvedValue(newUser);

    const req = new Request("http:/localhost:3000/api/hello", {
      method: "POST",
      body: JSON.stringify(newUser),
    });
    const res = await POST(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.test).toEqual(newUser);
  });

  it("GET /api/hello should return users", async () => {
    // Mock the response of prisma.user.findMany
    const mockUsers = [{ id: "123", name: "New User" }];
    prisma.user.findMany.mockResolvedValue(mockUsers);

    const req = new Request("http:/localhost:3000/api/hello", {
      method: "GET",
    });
    const res = await GET(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.test).toEqual(mockUsers);
  });

  it("PATCH /api/hello should update the user name", async () => {
    // Mock the response of prisma.user.update
    const updatedUser = { id: "123", name: "Updated User" };
    prisma.user.update.mockResolvedValue(updatedUser);

    const req = new Request("http:/localhost:3000/api/hello", {
      method: "PATCH",
      body: JSON.stringify({ name: "Updated User" }),
    });
    const res = await PATCH(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.test).toEqual(updatedUser);
  });

  it("DELETE /api/hello should delete the user", async () => {
    // Mock the response of prisma.user.delete
    const deletedUser = { id: "2", name: "Deleted User" };
    prisma.user.delete.mockResolvedValue(deletedUser);

    const req = new Request("http:/localhost:3000/api/hello", {
      method: "DELETE",
    });
    const res = await DELETE(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.test).toEqual(deletedUser);
  });

});
