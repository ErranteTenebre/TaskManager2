import styles from "./confirmDialog.module.scss";

import { Dialog } from "@headlessui/react";
import { FaQuestion } from "react-icons/fa";
import { ModalWrapper } from "Components/ModalWrapper";
import { Button } from "Components/Controls/Button";

export function ConfirmDialog({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type = "delete",
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className={styles.dialog__wrapper}>
          <Dialog.Title as="h3" className="">
            <p
              className={`${styles["dialog__title-text"]} ${
                type === "restore" || type === "restoreAll"
                  ? styles["restore-action"]
                  : ""
              }`}
            >
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>

          <p className={styles.dialog__question}>
            {msg ?? "Are you sure you want to delete the selected record?"}
          </p>

          <div className={styles.dialog__buttons}>
            <Button
              type="button"
              className={`${styles["dialog__action-button"]} ${
                type === "restore" || type === "restoreAll"
                  ? styles["restore-action"]
                  : ""
              }`}
              onClick={onClick}
              label={type === "restore" ? "Restore" : "Delete"}
            />

            <Button
              type="button"
              className={styles["dialog__cancel-button"]}
              onClick={() => closeDialog()}
              label="Cancel"
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}
