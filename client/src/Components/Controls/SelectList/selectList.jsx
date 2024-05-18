import styles from "./selectList.module.scss";

import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";

const SelectList = ({
  label,
  options,
  selectedOption,
  displayProperty,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      {label && <p className={styles.label}>{label}</p>}

      <Listbox value={selectedOption} onChange={onChange}>
        <div className={styles["list-container"]}>
          <Listbox.Button className={styles.button}>
            <span className={styles.block}>
              {selectedOption[displayProperty]}
            </span>
            <span className={styles["icon-container"]}>
              <BsChevronExpand className={styles.icon} aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave={styles.leaveTransition}
            leaveFrom={styles.leaveFrom}
            leaveTo={styles.leaveTo}
          >
            <Listbox.Options className={styles.options}>
              {options &&
                options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `${styles.option} ${
                        active ? styles.active : styles.unactive
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span className={styles.truncate}>
                          {option[displayProperty]}
                        </span>
                        {selected ? (
                          <span className={styles.selectedIcon}>
                            <MdCheck
                              className={styles.checkIcon}
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

export { SelectList };
