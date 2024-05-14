import React, { forwardRef, useState } from "react";
import styles from "./formInput.module.scss";

const FormInput = ({ icon, name, type, placeholder, register, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <div
        className={`${styles.formInput} ${isFocused ? styles.focused : ""} ${
          isHovered ? styles.hovered : ""
        }`}
      >
        <div className={styles.imageContainer}>{icon}</div>
        <input
          className={`${styles.input} text`}
          type={type ? type : "text"}
          name={name}
          placeholder={placeholder}
          {...register(name)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <span className={`${styles.errorBlock} error-text`}>
        {error ? error : "\u00a0"}
      </span>
    </div>
  );
};

export { FormInput };
