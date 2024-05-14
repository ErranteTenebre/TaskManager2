import { WelcomePageHeader } from "Components/WelcomePageHeader";

import styles from "./welcomePage.module.scss";

export function WelcomePage() {
  return (
    <div>
      <WelcomePageHeader></WelcomePageHeader>
      <main>
        <section className={styles.container}>
          <h2 className="h2">Начни уже сейчас!</h2>

          <p className={`${styles.subtitle} text`}>
            задачи, проекты, работа в команде - все это доступно бесплатно в
            нашей программе
          </p>
          <a className={`${styles["start-button"]} button`} href="/register">
            Начать
          </a>
        </section>
      </main>
    </div>
  );
}
