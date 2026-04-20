import { useEffect, useState } from "react";
import Header from "./Header/Header";
import TaskInput from "./TaskInput/TaskInput";
import TaskList from "./TaskList/TaskList";
import Footer from "./Footer/Footer";
import EmptyState from "./EmptyState/EmptyState";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const API = import.meta.env.VITE_API_URL;

function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API}/tasks`);
      const data: Task[] = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (text: string) => {
    try {
      await fetch(`${API}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      fetchTasks();
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`${API}/tasks/${id}`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const toggleTask = async (task: Task) => {
    try {
      await fetch(`${API}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      fetchTasks();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-container">
      <Header />

      <TaskInput addTask={addTask} />

      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      )}

      <Footer total={tasks.length} completed={completedTasks} />
    </div>
  );
}

export default App;