import styles from "./addTask.module.scss";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { ModalWrapper } from "Components/ModalWrapper";
import { Dialog } from "@headlessui/react";
import { BiImages } from "react-icons/bi";

import { TextBox } from "Components/Controls/TextBox";
import { UserList } from "Components/Controls/UserList";
import { SelectList } from "Components/Controls/SelectList";
import { Button } from "Components/Controls/Button";

const LISTS = ["Для выполнения", "В работе", "Выполнена"];
const PRIORIRY = ["Высокий", "Средний", "Обычный", "Низкий"];

const uploadedFileURLs = [];

const AddTask = ({ open, setOpen }) => {
  const task = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler = () => {};

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title as="h2" className={styles["dialog-title"]}>
            {task ? "Изменить задачу" : "Добавить задачу"}
          </Dialog.Title>

          <div className={styles["form-container"]}>
            <TextBox
              placeholder="Заголовок задачи"
              type="text"
              name="title"
              label="Заголовок задачи"
              className={styles.textBox}
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className={styles.row}>
              <SelectList
                label="Стадия"
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className={styles["textbox-container"]}>
                <TextBox
                  placeholder="Date"
                  type="date"
                  name="date"
                  label="Дата начала"
                  className={styles.textBox}
                  register={register("date", {
                    required: "Необходимо ввести дату!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className={styles.row}>
              <SelectList
                label="Приоритет"
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className={styles["assets-wrapper"]}>
                <label className={styles["assets-label"]} htmlFor="imgUpload">
                  <input
                    type="file"
                    className={styles["assets-input"]}
                    id="imgUpload"
                    onChange={(e) => handleSelect(e)}
                    accept=".jpg, .png, .jpeg"
                    multiple={true}
                  />
                  <BiImages />
                  <span>Добавить приложения</span>
                </label>
              </div>
            </div>

            <div className={styles.bottom}>
              {uploading ? (
                <span className={styles.uploading}>Загрузка приложений</span>
              ) : (
                <Button
                  label="Создать"
                  type="submit"
                  className={styles["upload-button"]}
                />
              )}

              <Button
                type="button"
                className={styles["cancel-button"]}
                onClick={() => setOpen(false)}
                label="Отмена"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export { AddTask };
