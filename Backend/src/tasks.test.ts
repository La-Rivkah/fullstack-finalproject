import request from "supertest";
import { describe, it, expect, afterEach } from "vitest";
import app from "./app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Guardamos los ids creados en cada test para borrarlos después
let createdIds: number[] = [];

afterEach(async () => {
  if (createdIds.length > 0) {
    await prisma.task.deleteMany({
      where: { id: { in: createdIds } },
    });
    createdIds = [];
  }
});

describe("GET /tasks", () => {
  it("responde 200 con un array", async () => {
    const res = await request(app).get("/tasks");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("POST /tasks", () => {
  it("crea una tarea con título válido", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Tarea de prueba" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Tarea de prueba");
    expect(res.body.completed).toBe(false);

    createdIds.push(res.body.id);
  });

  it("rechaza crear una tarea sin título", async () => {
    const res = await request(app).post("/tasks").send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Title required" });
  });
});

describe("PUT /tasks/:id", () => {
  it("actualiza el título y estado de una tarea existente", async () => {
    const created = await request(app)
      .post("/tasks")
      .send({ title: "Tarea a editar" });
    createdIds.push(created.body.id);

    const res = await request(app)
      .put(`/tasks/${created.body.id}`)
      .send({ title: "Tarea editada", completed: true });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Tarea editada");
    expect(res.body.completed).toBe(true);
  });

  it("devuelve 400 si el id no es válido", async () => {
    const res = await request(app)
      .put("/tasks/abc")
      .send({ title: "x" });

    expect(res.status).toBe(400);
  });
});

describe("DELETE /tasks/:id", () => {
  it("elimina una tarea existente", async () => {
    const created = await request(app)
      .post("/tasks")
      .send({ title: "Tarea a eliminar" });

    const res = await request(app).delete(`/tasks/${created.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Task deleted" });
    // No la agregamos a createdIds porque ya se eliminó
  });

  it("devuelve 400 si el id no es válido", async () => {
    const res = await request(app).delete("/tasks/abc");

    expect(res.status).toBe(400);
  });
});