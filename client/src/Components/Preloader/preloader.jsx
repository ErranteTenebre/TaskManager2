import React from "react";

import styles from "./preloader.module.scss";

const Preloader = () => {
  return (
    <div className={styles["dots-container"]}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

export { Preloader };
