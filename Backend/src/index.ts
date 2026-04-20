import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3000;

const SECRET_KEY = process.env.JWT_SECRET || "mi_clave_secreta";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

app.use(
  cors({
    origin: "*", 
  })
);

app.use(express.json());

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123456") {
    const token = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.json({
      message: "Login successful",
      token,
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

app.get("/", (_req: Request, res: Response) => {
  res.send("Backend is working!");
});

app.get("/private", verifyToken, (_req: Request, res: Response) => {
  res.json({ message: "Acceso permitido" });
});

app.get("/tasks", async (_req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: "asc" },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

app.post("/tasks", async (req: Request, res: Response) => {
  try {
    const { title, completed } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = await prisma.task.create({
      data: {
        title: title.trim(),
        completed: completed ?? false,
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    const existingTask = await prisma.task.findUnique({ where: { id } });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title:
          title !== undefined && title.trim() !== ""
            ? title.trim()
            : existingTask.title,
        completed:
          completed !== undefined ? completed : existingTask.completed,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task" });
  }
});

app.patch("/tasks/:id/toggle", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: {
        completed: !task.completed,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to toggle task" });
  }
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({ where: { id } });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});