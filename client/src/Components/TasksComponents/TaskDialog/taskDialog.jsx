import styles from "./taskDialog.module.scss";

import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";

import { AddTask } from "Components/AddTask";
import { AddSubTask } from "Components/TasksComponents/AddSubTask";
import { ConfirmDialog } from "Components/Dialogs/ConfirmDialog";

const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const duplicateHandler = () => {};
  const deleteClicks = () => {};
  const deleteHandler = () => {};

  const items = [
    {
      label: "Open Task",
      icon: (
        <AiTwotoneFolderOpen
          className={styles["task-dialog__menu-item-icon"]}
          aria-hidden="true"
        />
      ),
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "Edit",
      icon: (
        <MdOutlineEdit
          className={styles["task-dialog__menu-item-icon"]}
          aria-hidden="true"
        />
      ),
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub-Task",
      icon: (
        <MdAdd
          className={styles["task-dialog__menu-item-icon"]}
          aria-hidden="true"
        />
      ),
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: (
        <HiDuplicate
          className={styles["task-dialog__menu-item-icon"]}
          aria-hidden="true"
        />
      ),
      onClick: () => duplicateHandler(),
    },
  ];

  return (
    <>
      <div>
        <Menu as="div" className={styles["task-dialog__menu"]}>
          <Menu.Button className={styles["task-dialog__menu-button"]}>
            <BsThreeDots />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter={styles.enter}
            enterFrom={styles.enterFrom}
            enterTo={styles.enterTo}
            leave={styles.leave}
            leaveFrom={styles.leaveFrom}
            leaveTo={styles.leaveTo}
          >
            <Menu.Items className={styles["task-dialog__menu-items"]}>
              <div className={styles["task-dialog__menu-items-container"]}>
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${active ? styles.active : ""} ${
                          styles["task-dialog__menu-item-button"]
                        }`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>

              <div className={styles["task-dialog__delete-menu-item"]}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => deleteClicks()}
                      className={`${active ? styles.active : ""} ${
                        styles["task-dialog__delete-menu-item-button"]
                      }`}
                    >
                      <RiDeleteBin6Line
                        className={styles["task-dialog__delete-icon"]}
                        aria-hidden="true"
                      />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={task}
        key={new Date().getTime()}
      />

      <AddSubTask open={open} setOpen={setOpen} />

      <ConfirmDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export { TaskDialog };
