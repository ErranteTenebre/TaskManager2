import React, { useState } from "react";
import styles from "./checkbox.module.scss";

export function Checkbox({ label }) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className={styles.checkbox}>
      <input
        className={styles.input}
        type="checkbox"
        checked={isChecked}
        onChange={toggleCheckbox}
      />
      <svg
        className={`${styles.checkboxCustom} ${
          isChecked ? `${styles.active}` : ""
        }`}
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke={isChecked ? "#fff" : "none"}
        />
      </svg>
      {label && <span className={`${styles.label} text`}>{label}</span>}
    </label>
  );
}
