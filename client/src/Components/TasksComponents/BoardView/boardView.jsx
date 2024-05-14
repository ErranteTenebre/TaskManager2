import styles from "./boardView.module.scss";

import React from "react";
import { TaskCard } from "Components/TasksComponents/TaskCard";

const BoardView = ({ tasks }) => {
  return (
    <div className={styles["board-view__container"]}>
      {tasks.map((task, index) => (
        <TaskCard task={task} key={index} />
      ))}
    </div>
  );
};

export { BoardView };
