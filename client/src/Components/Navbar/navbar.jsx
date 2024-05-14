import styles from "./navbar.module.scss";
import { UserAvatar } from "Components/UserAvatar";
import { WorkspacePanel } from "Components/WorkspacePanel";

import React from "react";
import { MdOutlineSearch } from "react-icons/md";

const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles["left-panel"]}`}>
        <div className={styles["search-wrapper"]}>
          <button className={styles["search-button"]}>☰</button>
          <div className={styles["search-container"]}>
            <MdOutlineSearch className={styles["search-icon"]} />

            <input
              type="text"
              placeholder="Поиск...."
              className={styles["search-input"]}
            />
          </div>
        </div>
      </div>

      <div className={styles["right-panel"]}>
        <div className={styles["workspace-panel-wrapper"]}>
          <WorkspacePanel />
        </div>
        <div className={styles["user-avatar-wrapper"]}>
          <UserAvatar />
        </div>
      </div>
    </div>
  );
};

export { Navbar };
