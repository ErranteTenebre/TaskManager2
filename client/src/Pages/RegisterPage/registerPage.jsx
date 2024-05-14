import styles from "./register.module.scss";
import { RegisterForm } from "Components/Forms";
import { Logo } from "Components/Logo";

export function RegisterPage() {
  return (
    <div>
      <main>
        <section className={styles.content}>
          <div className={styles["content-container"]}>
            <Logo></Logo>

            <RegisterForm className={styles.form} />
          </div>
        </section>
      </main>
    </div>
  );
}
