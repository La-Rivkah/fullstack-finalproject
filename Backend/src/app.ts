import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();

const prisma = new PrismaClient();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || "mi_clave_secreta";

// LOGIN
app.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (prisma as any).user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
});

// OBTENER TAREAS
app.get("/tasks", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// CREAR TAREA (CORREGIDO)
app.post("/tasks", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;

    // Validación: rechaza títulos vacíos o con solo espacios
    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        completed: false,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

// ACTUALIZAR TAREA
app.put(
  "/tasks/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { title, completed } = req.body;

      const task = await prisma.task.update({
        where: {
          id,
        },
        data: {
          title,
          completed,
        },
      });

      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

// ELIMINAR TAREA
app.delete(
  "/tasks/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      await prisma.task.delete({
        where: {
          id,
        },
      });

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

// Manejo general de errores
app.use(
  (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
);

export default app;