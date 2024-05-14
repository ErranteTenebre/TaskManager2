import styles from "./userInfo.module.scss";

import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { getInitials } from "Utils/generalUtils";

const UserInfo = ({ user }) => {
  return (
    <div className={styles["user-info__wrapper"]}>
      <Popover className={styles["user-info__container"]}>
        {/* {({ open }) => ( */}
        <>
          <Popover.Button className={styles["user-info__open-button"]}>
            <span>{getInitials(user?.name)}</span>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter={styles["user-info__enter"]}
            enterFrom={styles["user-info__enter-from"]}
            enterTo={styles["user-info__enter-to"]}
            leave={styles["user-info__leave-to"]}
            leaveFrom={styles["user-info__leave-from"]}
            leaveTo={styles["user-info__leave-to"]}
          >
            <Popover.Panel className={styles["user-info__panel"]}>
              <div className={styles["user-info__panel-container"]}>
                <div className={styles["user-info__initials-container"]}>
                  <span className={styles["user-info__initials-text"]}>
                    {getInitials(user?.name)}
                  </span>
                </div>
                <div className={styles["user-info__user-information-part"]}>
                  <p className={styles["user-info__user-name"]}>{user?.name}</p>
                  <span className={styles["user-info__user-title"]}>
                    {user?.title}
                  </span>
                  <span className={styles["user-info__user-email"]}>
                    {user?.email ?? "email@example.com"}
                  </span>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
        {/* )} */}
      </Popover>
    </div>
  );
};

export { UserInfo };
