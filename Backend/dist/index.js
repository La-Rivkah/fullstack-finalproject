"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
const SECRET_KEY = process.env.JWT_SECRET || "mi_clave_secreta";
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "123456") {
        const token = jsonwebtoken_1.default.sign({ username }, SECRET_KEY, {
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
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token required" });
    }
    const token = authHeader.split(" ")[1];
    try {
        jsonwebtoken_1.default.verify(token, SECRET_KEY);
        next();
    }
    catch {
        return res.status(403).json({ message: "Invalid token" });
    }
};
app.get("/", (_req, res) => {
    res.send("Backend is working 🚀");
});
app.get("/tasks", async (_req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: { id: "asc" },
        });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});
app.post("/tasks", async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
});
app.put("/tasks/:id", async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
});
app.delete("/tasks/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.task.delete({
            where: { id },
        });
        res.json({ message: "Task deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
