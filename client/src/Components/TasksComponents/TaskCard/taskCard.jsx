import styles from "./taskCard.module.scss";

import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdRadioButtonUnchecked,
} from "react-icons/md";

import { formatDate } from "Utils/dateUtils";
import { BGS, PRIOTITYSTYELS, TASK_TYPE } from "Utils/stylesUtils";

import { TaskDialog } from "Components/TasksComponents/TaskDialog";
import { AddSubTask } from "Components/TasksComponents/AddSubTask";
import { UserInfo } from "Components/UserInfo";

import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const ICONS = {
  Высокий: <MdKeyboardDoubleArrowUp />,
  Средний: <MdKeyboardArrowUp />,
  Низкий: <MdKeyboardArrowDown />,
  Обычный: <MdRadioButtonUnchecked />, // Добавление иконки для обычного приоритета
};

const TaskCard = ({ task }) => {
  const [open, setOpen] = useState(false);
  const user = {
    isAdmin: true,
  };

  return (
    <>
      <div className={styles["task-card__wrapper"]}>
        <div className={styles["task-card__top-wrapper"]}>
          <div className={styles["task-card__top"]}>
            <div
              className={`${styles["task-card__priority-container"]} ${
                PRIOTITYSTYELS[task?.priority.name]
              }`}
            >
              <span className={styles["task-card__priority-icon"]}>
                {ICONS[task?.priority.name]}
              </span>
              <span className={styles["task-card__priority-text"]}>
                {task?.priority.name} Приоритет
              </span>
            </div>

            {user?.isAdmin && <TaskDialog task={task} />}
          </div>

          <>
            <div className={styles["task-card__title-and-data-container"]}>
              <div
                className={`${styles["task-card__task-stage-circle"]} ${
                  TASK_TYPE[task.stage.name]
                }`}
              />
              <h4 className={styles["task-card__task-title"]}>{task?.title}</h4>
            </div>
            <span className={styles["task-card__task-date"]}>
              {formatDate(new Date(task?.startDate))}
            </span>
          </>

          <div className={styles["task-card-bottom-border"]} />

          <div className={styles["task-card__middle-container"]}>
            <div className={styles["task-card__additional-info-container"]}>
              <div className={styles["task-card__activities-info"]}>
                <BiMessageAltDetail />
                <span>{task?.activities?.length}</span>
              </div>
              <div className={styles["task-card__assets-info"]}>
                <MdAttachFile />
                <span>{task?.assets?.length}</span>
              </div>
              <div className={styles["task-card__subtasks-info"]}>
                <FaList />
                <span>0/{task?.subTasks?.length}</span>
              </div>
            </div>

            <div className={styles["task-card__users-container"]}>
              {task?.taskResponsibles?.map((responsible, index) => (
                <div
                  key={index}
                  className={`${styles["task-card__user"]}
                  ${BGS[index % BGS?.length]}
                `}
                >
                  <UserInfo user={responsible.responsible} />
                </div>
              ))}
            </div>
          </div>

          {/* sub tasks
        {task?.subTasks?.length > 0 ? (
          <div className="py-4 border-t border-gray-200">
            <h5 className="text-base line-clamp-1 text-black">
              {task?.subTasks[0].title}
            </h5>

            <div className="p-4 space-x-8">
              <span className="text-sm text-gray-600">
                {formatDate(new Date(task?.subTasks[0]?.date))}
              </span>
              <span className="bg-blue-600/10 px-3 py-1 rounded0full text-blue-700 font-medium">
                {task?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="py-4 border-t border-gray-200">
              <span className="text-gray-500">No Sub Task</span>
            </div>
          </>
        )} */}
        </div>
        <div className={styles["task-card__add-subtask-container"]}>
          <button
            onClick={() => setOpen(true)}
            disabled={user.isAdmin ? false : true}
            className={styles["task-card__add-subtask-button"]}
          >
            <IoMdAdd className="text-lg" />
            <span>Добавить подзадачу</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    </>
  );
};

export { TaskCard };
