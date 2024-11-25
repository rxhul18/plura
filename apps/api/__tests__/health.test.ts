import { GET } from "../app/api/[[...route]]/route";
import { describe, it, expect } from "vitest";

describe("Health API", () => {
  it("GET /api/health should return health status", async () => {
    const req = new Request("http://localhost:3000/api/health", {
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
