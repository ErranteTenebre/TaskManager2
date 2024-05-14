import styles from "./tasksPage.module.scss";

import { useParams } from "react-router-dom";

import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

import { Tabs } from "Components/Tabs";
import { Title } from "Components/Title";
import { Button } from "Components/Controls/Button";
import { TaskTitle } from "Components/TasksComponents/TaskTitle";
import { BoardView } from "Components/TasksComponents/BoardView";
import { AddTask } from "Components/AddTask";
import { Preloader } from "Components/Preloader";

import { tasks } from "Assets/data";
import { Table } from "Components/TasksComponents/Table";

const TABS = [
  { title: "Доска", icon: <MdGridView /> },
  { title: "Таблица", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const TasksPage = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  return loading ? (
    <div className={styles["tasks-page__preloader-container"]}>
      <Preloader />
    </div>
  ) : (
    <div className={styles["tasks-page__top"]}>
      <div className={styles["tasks-page__title-and-create"]}>
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Создать задачу"
            icon={<IoMdAdd className="text-lg" />}
            className={styles["tasks-page__create-button"]}
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className={styles["tasks-page__tabs-container"]}>
            <TaskTitle label="Для выполнения" type={TASK_TYPE.todo} />
            <TaskTitle label="В процессе" type={TASK_TYPE["in progress"]} />
            <TaskTitle label="Выполнена" type={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={tasks} />
        ) : (
          <div className={styles["tasks-page__table-view-container"]}>
            <Table tasks={tasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export { TasksPage };
