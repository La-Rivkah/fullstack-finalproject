import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "./app";

describe("GET /health", () => {
  it("responde 200 con status ok", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("POST /login", () => {
  it("devuelve un token con credenciales correctas", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "admin", password: "123456" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("rechaza credenciales incorrectas", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "admin", password: "incorrecta" });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid credentials" });
  });
});