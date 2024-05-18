import React from "react";
import { IoMdAdd } from "react-icons/io";
import styles from "./taskTitle.module.scss";

const TaskTitle = ({ label, type }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={`${styles.circle} ${type}`} />
        <p className={styles.text}>{label}</p>
      </div>
    </div>
  );
};

export { TaskTitle };
