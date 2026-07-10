import TaskCard from "../taskCard/TaskCard";
import type { Task } from "../App";
import "./TaskList.css";

type Props = {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleTask: (task: Task) => void;
};

function TaskList({ tasks, deleteTask, toggleTask }: Props) {
  //Recorre la lista de tareas y renderiza un TaskCard para cada una,
  //  pasando las funciones necesarias para completar o eliminar la tarea.
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          deleteTask={deleteTask
          toggleTask={toggleTask
        />
      ))}
    </ul>
  );
}

export default TaskList;