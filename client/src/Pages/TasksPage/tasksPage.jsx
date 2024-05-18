import styles from "./tasksPage.module.scss";

import { useParams } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { useTasks } from "Hooks/useTasks";

const TABS = [
  { title: "Доска", icon: <MdGridView /> },
  { title: "Таблица", icon: <FaList /> },
];

const TASK_TYPE = {
  "Для выполнения": "bg-blue-600",
  "В процессе": "bg-yellow-600",
  Выполнена: "bg-green-600",
};

const TasksPage = () => {
  const params = useParams();

  const [selectedView, setSelectedView] = useState(0);
  const [isAddTaskPopupOpen, setIsAddTaskOpen] = useState(false);

  const { tasks, isLoading } = useTasks();

  const status = params?.status || "";

  return isLoading ? (
    <div className={styles["tasks-page__preloader-container"]}>
      <Preloader />
    </div>
  ) : (
    <div className={styles["tasks-page__top"]}>
      <div className={styles["tasks-page__title-and-create"]}>
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setIsAddTaskOpen(true)}
            label="Создать задачу"
            icon={<IoMdAdd className="text-lg" />}
            className={styles["tasks-page__create-button"]}
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelectedView}>
        {!status && (
          <div className={styles["tasks-page__tabs-container"]}>
            <TaskTitle
              label="Для выполнения"
              type={TASK_TYPE["Для выполнения"]}
            />
            <TaskTitle label="В процессе" type={TASK_TYPE["В процессе"]} />
            <TaskTitle label="Выполнена" type={TASK_TYPE.Выполнена} />
          </div>
        )}

        {selectedView !== 1 ? (
          <BoardView tasks={tasks} />
        ) : (
          <div className={styles["tasks-page__table-view-container"]}>
            <Table tasks={tasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={isAddTaskPopupOpen} setOpen={setIsAddTaskOpen} />
    </div>
  );
};

export { TasksPage };
