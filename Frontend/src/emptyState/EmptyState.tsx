import "./EmptyState.css";

function EmptyState() {
  return (
    <div className="empty-container">
      <h4 className="empty-title">No hay tareas aún</h4>

      <p className="empty-text">
        Agrega tu primera tarea</p>
    </div>
  );
}

export default EmptyState;