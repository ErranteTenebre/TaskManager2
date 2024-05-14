import styles from "./dashboardHeader.module.scss";

import { Logo } from "../Logo";

const DashboardHeader = () => {
  return (
    <div className={styles["page-header"]}>
      <Logo />
      <div className={styles.buttons}>
        <a className="link" href="/auth">
          Войти
        </a>
        <a className={`${styles.registerButton} button`} href="/register">
          Зарегистрироваться
        </a>
      </div>
    </div>
  );
};

export { DashboardHeader };
