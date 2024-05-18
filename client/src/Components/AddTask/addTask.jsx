import styles from "./addTask.module.scss";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalWrapper } from "Components/ModalWrapper";
import { Dialog } from "@headlessui/react";
import { BiImages } from "react-icons/bi";
import { TextBox } from "Components/Controls/TextBox";
import { UserList } from "Components/Controls/UserList";
import { SelectList } from "Components/Controls/SelectList";
import { Button } from "Components/Controls/Button";
import axios from "axios";
import config from "appConfig";
import { useParams } from "react-router-dom";
import { AuthContext } from "Context/AuthContext";
import { useTasks } from "Hooks/useTasks";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTaskSchema } from "Utils/validationSchemas";

const AddTask = ({ open, setOpen }) => {
  const defaultValues = {
    title: "",
    description: "",
    date: null,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(createTaskSchema),
  });

  const priorityList = [
    { id: 1, name: "Обычный" },
    { id: 2, name: "Низкий" },
    { id: 3, name: "Средний" },
    { id: 4, name: "Высокий" },
  ];

  const [priority, setPriority] = useState(priorityList[0]);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { workspaceId } = useParams();
  const { user } = useContext(AuthContext);
  const { getTasks } = useTasks();

  const submitHandler = (data) => {
    const selectedUserIds = selectedUsers.map((user) => user.id);

    axios
      .post(`${config.SERVER_BASE_URL}task`, {
        title: data.title,
        startDate: data.date,
        description: data.description,
        priorityId: priority.id,
        selectedUsers: selectedUserIds,
        creatorId: user.id,
        workspaceId: workspaceId,
        projectId: null,
      })
      .then(() => {
        setOpen(false);
        getTasks();
        resetForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const resetForm = () => {
    reset(defaultValues);
    setPriority(priorityList[0]);
    setAssets([]);
    setSelectedUsers([]);
  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title as="h2" className={styles["dialog-title"]}>
          Добавить задачу
        </Dialog.Title>

        <div className={styles["form-container"]}>
          <TextBox
            placeholder="Заголовок задачи"
            type="text"
            name="title"
            label="Заголовок задачи"
            className={styles.textBox}
            register={register}
            error={errors.title ? errors.title.message : ""}
          />

          <TextBox
            placeholder="Описание"
            type="text"
            name="description"
            label="Описание задачи"
            className={styles.textBox}
            register={register}
            error={errors.description ? errors.description.message : ""}
          />

          <UserList
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />

          {/* <div className={styles.row}>
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
            </div> */}

          <div className={styles.row}>
            {priorityList && (
              <SelectList
                label="Приоритет"
                options={priorityList}
                selectedOption={priority}
                displayProperty="name"
                onChange={setPriority}
              />
            )}

            <div className={styles["textbox-container"]}>
              <TextBox
                placeholder="Дата начала"
                type="date"
                name="date"
                label="Дата начала"
                className={styles.textBox}
                register={register}
                error={errors.date ? errors.date.message : ""}
              />
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
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
              label="Отмена"
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export { AddTask };
