import type { ReactElement } from "react";
import "./footer.css";

type Props = {
  total: number;
  completed: number;
};

function Footer({ total, completed }: Props): ReactElement {
  const incomplete = total - completed;

  return (
    <footer className="footer">
      <p>Tareas Incompletas: {incomplete}</p>
      <p>Tareas Completadas: {completed}</p>
      <p>Tareas Totales: {total}</p>
    </footer>
  );
}

export default Footer;