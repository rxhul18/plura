import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET, POST, PATCH, DELETE } from "../app/api/[[...route]]/route";
import { prisma } from "@repo/db";

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

  it("POST http:/localhost:3000/api/hello should create a new user", async () => {
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

  it("GET http:/localhost:3000/api/hello should return users", async () => {
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

  it("PATCH http:/localhost:3000/api/hello should update the user name", async () => {
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

  it("DELETE http:/localhost:3000/api/hello should delete the user", async () => {
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

  it("GET /api/health should return health status", async () => {
    const req = new Request("http:/localhost:3000/api/health", {
      method: "GET",
    });
    const res = await GET(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({
      message: "i am alive",
      status: 200,
    });
  });
});
