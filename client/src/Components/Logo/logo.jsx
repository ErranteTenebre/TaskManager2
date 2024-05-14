import styles from "./logo.module.scss";
import logoImage from "images/logo.png";

console.log(logoImage);

const Logo = ({ className }) => {
  return (
    <a href="/" className={`${styles.container} ${className}`}>
      <img className={styles.image} src={logoImage} alt="Логотип"></img>
    </a>
  );
};

export { Logo };
