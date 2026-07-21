import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

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

const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
};

app.get("/", (_req: Request, res: Response) => {
  res.send("Backend is working 🚀");
});

app.get("/health", (_req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
  });
});

app.get("/tasks", async (_req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: "asc" },
    });

    return res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);

    return res.status(500).json({
      message: "Error fetching tasks",
    });
  }
});

app.post("/tasks", async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Title required",
      });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        completed: false,
      },
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);

    return res.status(500).json({
      message: "Error creating task",
    });
  }
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        completed,
      },
    });

    return res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);

    return res.status(500).json({
      message: "Error updating task",
    });
  }
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    await prisma.task.delete({
      where: { id },
    });

    return res.json({
      message: "Task deleted",
    });
  } catch (error) {
    console.error("Error deleting task:", error);

    return res.status(500).json({
      message: "Error deleting task",
    });
  }
});

throw new Error("fallo simulado");

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});




