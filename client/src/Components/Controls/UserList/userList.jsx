import styles from "./userList.module.scss";

import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { summary } from "Assets/data";
import { getInitials } from "Utils/generalUtils";
import { MdCheck } from "react-icons/md";

const UserList = ({ setTeam, team }) => {
  const data = summary.users;
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (el) => {
    setSelectedUsers(el);
    setTeam(el?.map((u) => u._id));
  };
  useEffect(() => {
    if (team?.length < 1) {
      data && setSelectedUsers([data[0]]);
    } else {
      setSelectedUsers(team);
    }
  }, []);

  return (
    <div>
      <p className={styles.title}>Assign Task To: </p>
      <Listbox
        value={selectedUsers}
        onChange={(el) => handleChange(el)}
        multiple
      >
        <div className={styles.container}>
          <Listbox.Button className={styles["list-button"]}>
            <span className={styles["selected-users-container"]}>
              {selectedUsers?.map((user) => user.name).join(", ")}
            </span>

            <span className={styles["scrolling-icon-container"]}>
              <BsChevronExpand
                className={styles["scrolling-icon"]}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave={styles.leave}
            leaveFrom={styles["leave-from"]}
            leaveTo={styles["leave-to"]}
          >
            <Listbox.Options className={styles.options}>
              {data?.map((user, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `${styles.option} ${
                      active ? styles.active : styles.unactive
                    } `
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <div
                        className={`${styles["option-left"]} ${
                          selected ? styles.selected : ""
                        }`}
                      >
                        <div className={styles["option-icon-wrapper"]}>
                          <span className={styles["option-icon-text"]}>
                            {getInitials(user.name)}
                          </span>
                        </div>
                        <span>{user.name}</span>
                      </div>
                      {selected ? (
                        <span
                          className={styles["option-selected-icon-wrapper"]}
                        >
                          <MdCheck
                            className={styles["option-selected-icon"]}
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export { UserList };
