import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskList from "./TaskList";
import type { Task } from "../App";

const mockTasks: Task[] = [
  { id: 1, title: "Comprar leche", completed: false },
  { id: 2, title: "Estudiar para el examen", completed: true },
];

describe("TaskList", () => {
  it("renderiza una tarjeta por cada tarea", () => {
    render(
      <TaskList tasks={mockTasks} deleteTask={vi.fn()} toggleTask={vi.fn()} />
    );

    expect(screen.getByText("Comprar leche")).toBeInTheDocument();
    expect(screen.getByText("Estudiar para el examen")).toBeInTheDocument();
  });

  it("muestra el badge 'Completado' solo en tareas completadas", () => {
    render(
      <TaskList tasks={mockTasks} deleteTask={vi.fn()} toggleTask={vi.fn()} />
    );

    expect(screen.getAllByText("Completado")).toHaveLength(1);
  });

  it("llama a toggleTask con la tarea correcta al hacer click en el checkbox", async () => {
    const toggleTask = vi.fn();
    render(
      <TaskList tasks={mockTasks} deleteTask={vi.fn()} toggleTask={toggleTask} />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await userEvent.click(checkboxes[0]);

    expect(toggleTask).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("llama a deleteTask con el id correcto al hacer click en eliminar", async () => {
    const deleteTask = vi.fn();
    render(
      <TaskList tasks={mockTasks} deleteTask={deleteTask} toggleTask={vi.fn()} />
    );

    const deleteButtons = screen.getAllByLabelText("Eliminar");
    await userEvent.click(deleteButtons[1]);

    expect(deleteTask).toHaveBeenCalledWith(2);
  });
});