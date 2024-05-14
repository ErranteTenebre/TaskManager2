import { useParams } from "react-router-dom";
import styles from "./projectPage.module.scss";

const ProjectPage = () => {
  const { id } = useParams();
  return <div>Проект {id}</div>;
};

export { ProjectPage };
