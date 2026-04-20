import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || "mi_clave_secreta";

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

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

app.get("/", (_req: Request, res: Response) => {
  res.send("Backend is working 🚀");
});

app.get("/tasks", async (_req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: "asc" },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

app.post("/tasks", async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        completed: false,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        completed,
      },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});