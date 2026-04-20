import TaskCard from "../TaskCard/TaskCard";
import { Task } from "../App";
import "./TaskList.css";

type Props = {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleTask: (task: Task) => void;
};

function TaskList({ tasks, deleteTask, toggleTask }: Props) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;