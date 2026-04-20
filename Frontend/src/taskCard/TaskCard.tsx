import type { Task } from "../App";
import "./TaskCard.css";

type Props = {
  task: Task;
  deleteTask: (id: number) => void;
  toggleTask: (task: Task) => void;
};

function TaskCard({ task, deleteTask, toggleTask }: Props): React.ReactElement {
  const handleToggle = () => toggleTask(task);
  const handleDelete = () => deleteTask(task.id);

  return (
    <li
      className={`task-card ${task.completed ? "completed" : ""}`}
    >
      <label className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />

        <span className={task.completed ? "text-done" : ""}>
          {task.text}
        </span>
      </label>

      <button
        className="delete-btn"
        onClick={handleDelete}
        aria-label="Eliminar tarea"
      >
        ✕
      </button>
    </li>
  );
}

export default TaskCard;