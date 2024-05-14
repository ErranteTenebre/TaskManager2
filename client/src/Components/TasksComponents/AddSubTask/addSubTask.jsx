import styles from "./addSubTask.module.scss";

import { useForm } from "react-hook-form";
import { ModalWrapper } from "Components/ModalWrapper";
import { Dialog } from "@headlessui/react";
import { TextBox } from "Components/Controls/TextBox";
import { Button } from "Components/Controls/Button";

const AddSubTask = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [addSbTask] = useCreateSubTaskMutation();

  const handleOnSubmit = async (data) => {
    // try {
    //   const res = await addSbTask({ data, id }).unwrap();
    //   toast.success(res.message);
    //   setTimeout(() => {
    //     setOpen(false);
    //   }, 500);
    // } catch (err) {
    //   console.log(err);
    //   toast.error(err?.data?.message || err.error);
    // }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className={styles["add-sub-task__title"]}>
            ADD SUB-TASK
          </Dialog.Title>
          <div className={styles["add-sub-task__content"]}>
            <TextBox
              placeholder="Sub-Task title"
              type="text"
              name="title"
              label="Title"
              className={styles["add-sub-task__textbox"]}
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />

            <div className={styles["add-sub-task__super-content"]}>
              <TextBox
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className={styles["add-sub-task__textbox"]}
                register={register("date", {
                  required: "Date is required!",
                })}
                error={errors.date ? errors.date.message : ""}
              />
              <TextBox
                placeholder="Tag"
                type="text"
                name="tag"
                label="Tag"
                className={styles["add-sub-task__textbox"]}
                register={register("tag", {
                  required: "Tag is required!",
                })}
                error={errors.tag ? errors.tag.message : ""}
              />
            </div>
          </div>
          <div className={styles["add-sub-task__buttons"]}>
            <Button
              type="submit"
              className={styles["add-sub-task__add-button"]}
              label="Add Task"
            />

            <Button
              type="button"
              className={styles["add-sub-task__cancel-button"]}
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export { AddSubTask };
