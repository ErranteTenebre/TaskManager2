import styles from "./auth.module.scss";

import { LoginForm } from "Components/Forms";
import { Logo } from "Components/Logo";
import { Navigate } from "react-router-dom";

export function AuthPage() {
  return (
    <div>
      <main>
        <section className={styles.content}>
          <div className={styles["content-container"]}>
            <Logo></Logo>
            <LoginForm />
          </div>
        </section>
      </main>
    </div>
  );
}
