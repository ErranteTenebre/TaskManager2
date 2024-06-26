import React from "react";

import styles from "./textBox.module.scss";

const TextBox = ({
  type,
  placeholder,
  label,
  className,
  register,
  name,
  error,
}) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          {...register(name)}
          aria-invalid={error ? "true" : "false"}
          className={`${styles.input} ${className}`}
        />
      </div>
      {error && (
        <span className={`errorText ${styles["error-block"]}`}>{error}</span>
      )}
    </div>
  );
};

export { TextBox };
