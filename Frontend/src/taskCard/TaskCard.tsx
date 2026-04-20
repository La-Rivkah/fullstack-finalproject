import type { Task } from "../App";
import { Trash2 } from "lucide-react";
import "./TaskCard.css";

type Props = {
  task: Task;
  deleteTask: (id: number) => void;
  toggleTask: (task: Task) => void;
};

function TaskCard({ task, deleteTask, toggleTask }: Props) {
  const handleToggle = () => toggleTask(task);
  const handleDelete = () => deleteTask(task.id);

  return (
    <li className={`task-card ${task.completed ? "completed" : ""}`}>
      <label className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />

        <span className="task-text">
          {task.title}
        </span>

        {task.completed && <span className="status-badge">Completado</span>}

      </label>

      <button
        className="delete-btn"
        onClick={handleDelete}
        aria-label="Eliminar"
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
}

export default TaskCard;