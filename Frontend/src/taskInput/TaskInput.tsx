import { useState } from "react";
import "./TaskInput.css";

type Props = {
  addTask: (text: string) => void;
};

function TaskInput({ addTask }: Props) {
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) return;

    addTask(trimmedText);
    setText("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Escribe una tarea..."
        value={text}
        onChange={handleChange}
      />

      <button
        className="add-button"
        type="submit"
        disabled={!text.trim()}
      >
        Agregar
      </button>
    </form>
  );
}

export default TaskInput;