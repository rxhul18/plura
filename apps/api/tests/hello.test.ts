import { describe, it, expect, test } from "vitest";
import request from "supertest";
import { app } from "../app/api/[...route]/route";

describe("Example", () => {
  test("GET /health", async () => {
    const res = await app.request("/api/health");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe(
      JSON.stringify({ message: "i am alive", status: 200 }),
    );
  });
});
