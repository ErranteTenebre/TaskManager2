import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getInitials } from "Utils/generalUtils";

import styles from "./userAvatar.module.scss";
import { AuthContext } from "Context/AuthContext";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const navigate = useNavigate();
  const { handleLogOut } = useContext(AuthContext);

  return (
    <>
      <div>
        <Menu as="div" className={styles.menu}>
          <div>
            <Menu.Button className={styles["menu-button"]}>
              <span className={styles["user-initials"]}>
                {/* {getInitials(user?.name)} */} AS
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter={styles["transition-enter"]}
            enterFrom={styles["transition-enter-from"]}
            enterTo={styles["transition-enter-to"]}
            leave={styles["transition-leave"]}
            leaveFrom={styles["transition-leave-from"]}
            leaveTo={styles["transition-leave-to"]}
          >
            <Menu.Items className={styles["menu-items"]}>
              <div className={styles["menu-items__container"]}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpen(true)}
                      className={styles["menu-item__button"]}
                    >
                      <FaUser
                        className={styles["menu-item__icon"]}
                        aria-hidden="true"
                      />
                      Профиль
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenPassword(true)}
                      className={styles["menu-item__button"]}
                    >
                      <FaUserLock
                        className={styles["menu-item__icon"]}
                        aria-hidden="true"
                      />
                      Сменить пароль
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogOut}
                      className={styles["menu-item__button"]}
                    >
                      <IoLogOutOutline
                        className={styles["menu-item__icon"]}
                        aria-hidden="true"
                      />
                      Выход
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export { UserAvatar };
