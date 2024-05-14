import styles from "./testPage.module.scss";
import React, { useRef, useEffect } from "react";

export function TestPage() {
  return (
    <div className={styles.container}>
      <MyComponent></MyComponent>
    </div>
  );
}

const MyComponent = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    // Установка фокуса на input при монтировании компонента
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
};

export default MyComponent;
