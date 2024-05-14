import styles from "./title.module.scss";

import React from "react";

const Title = ({ title, className }) => {
  return <h2 className={`${styles.title} ${className}`}>{title}</h2>;
};

export { Title };
