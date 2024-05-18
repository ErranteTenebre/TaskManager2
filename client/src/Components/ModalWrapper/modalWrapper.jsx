import styles from "./modalWrapper.module.scss";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

const ModalWrapper = ({ open, setOpen, extended, children }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={styles.dialog}
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter={styles["dialog__transition-enter"]}
          enterFrom={styles["dialog__transition-enter-from"]}
          enterTo={styles["dialog__transition-enter-to"]}
          leave={styles["dialog__transition-leave"]}
          leaveFrom={styles["dialog__transition-leave-from"]}
          leaveTo={styles["dialog__transition-leave-to"]}
        >
          <div className={styles.dialog__transition} />
        </Transition.Child>

        <div className={styles.dialog__wrapper}>
          <div className={styles["dialog__inner-content"]}>
            <Transition.Child
              as={Fragment}
              enter={styles["dialog__transition-child-enter"]}
              enterFrom={styles["dialog__transition-child-enter-from"]}
              enterTo={styles["dialog__transition-child-enter-to"]}
              leave={styles["dialog__transition-child-leave"]}
              leaveFrom={styles["dialog__transition-child-leave-from"]}
              leaveTo={styles["dialog__transition-child-leave-to"]}
            >
              <Dialog.Panel
                className={`${styles.dialog__panel} ${
                  extended ? styles["dialog__panel-extended"] : ""
                }`}
              >
                <div className={styles["dialog__panel-wrapper"]}>
                  <div className={styles["dialog__panel-container"]}>
                    <div className={styles["dialog__panel-inner-content"]}>
                      {children}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { ModalWrapper };
