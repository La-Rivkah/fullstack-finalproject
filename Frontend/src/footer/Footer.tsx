import type { ReactElement } from "react";
import "./Footer.css";

type Props = {
  total: number;
  completed: number;
};

function Footer({ total, completed }: Props): ReactElement {
  const incomplete = total - completed;

  return (
    <footer className="footer">
      <p>Incompletas: {incomplete}</p>
      <p>Completadas: {completed}</p>
      <p>Total: {total}</p>
    </footer>
  );
}

export default Footer;