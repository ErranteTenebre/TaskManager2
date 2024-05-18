import styles from "./table.module.scss";

import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { BGS, PRIOTITYSTYELS, TASK_TYPE } from "Utils/stylesUtils";
import { formatDate } from "Utils/dateUtils";
import { FaList } from "react-icons/fa";
import { UserInfo } from "Components/UserInfo";
import { Button } from "Components/Controls/Button";
import { ConfirmDialog } from "Components/Dialogs/ConfirmDialog";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = () => {};

  const TableHeader = () => (
    <thead className={styles.table__header}>
      <tr className={styles["table__header-row"]}>
        <th className={styles["table__header-item"]}>Заголовок</th>
        <th className={styles["table__header-item"]}>Приоритет</th>
        <th
          className={`${styles["table__header-item"]} ${styles["table__header-item_created-at"]}`}
        >
          Дата начала
        </th>
        <th className={styles["table__header-item"]}>Вложения</th>
        <th className={styles["table__header-item"]}>Ответственные</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className={styles.table__row}>
      <td className={styles["table__row-cell"]}>
        <div className={styles["table__row-task-title"]}>
          <div
            className={`${styles["table__row-task-title-stage"]} ${
              TASK_TYPE[task?.stage]
            }`}
          />
          <p className={styles["table__row-task-title-text"]}>{task?.title}</p>
        </div>
      </td>

      <td className={styles.table__row}>
        <div className={styles["table__row-priority"]}>
          <span
            className={`${styles["table__row-priority-icon"]} ${
              PRIOTITYSTYELS[task?.priority.name]
            }`}
          >
            {ICONS[task?.priority]}
          </span>
          <span className={styles["table__row-priority-text"]}>
            {task?.priority.name} Priority
          </span>
        </div>
      </td>

      <td className={styles.table__row}>
        <span className={styles["table__row-date-text"]}>
          {formatDate(new Date(task?.startDate))}
        </span>
      </td>

      <td className={styles.table__row}>
        <div className={styles["table__row-sub-info"]}>
          <div className={styles["table__row-activities"]}>
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className={styles["table__row-assets"]}>
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className={styles["table__row-subtasks"]}>
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>

      <td className={styles.table__row}>
        <div className={styles["table__row-teams"]}>
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={`${styles["table__row-teams-item"]} ${
                BGS[index % BGS?.length]
              }`}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className={styles["table__row-buttons-cell"]}>
        <Button
          className={styles["table__row-edit-button"]}
          label="Изменить"
          type="button"
        />

        <Button
          className={styles["table__row-delete-button"]}
          label="Удалить"
          type="button"
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );
  return (
    <>
      <div className={styles["table__super-wrapper"]}>
        <div className={styles.table__wrapper}>
          <table className={styles.table}>
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TODO */}
      <ConfirmDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export { Table };
