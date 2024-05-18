import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalWrapper } from "Components/ModalWrapper";
import styles from "./workspace.module.scss";
import { TextBox } from "Components/Controls/TextBox";
import { Button } from "Components/Controls/Button";
import { yupResolver } from "@hookform/resolvers/yup";

import config from "appConfig";
import axios from "axios";
import { inviteSchema } from "Utils/validationSchemas";
import { WorkspaceContext } from "Context/WorkspaceContext";

export const WorkspaceInvitePeople = ({ open, setOpen }) => {
  const defaultValues = {
    email: "",
  };

  const { selectedWorkspace } = useContext(WorkspaceContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(inviteSchema),
  });

  const onSubmit = async (data) => {
    await axios
      .post(`${config.SERVER_BASE_URL}invite`, {
        userEmail: data.email,
        workspaceId: selectedWorkspace.id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen} extended>
      <div className={styles["workspace-invite__container"]}>
        <div className={styles["workspace-invite__header"]}>
          <h2 className={styles["workspace-invite__title"]}>
            Пригласить людей в рабочее пространство
          </h2>
          <p className={styles["workspace-invite__subtitle"]}>
            В этом окне вы можете добавить других пользователей в ваше рабочее
            пространство
          </p>
        </div>

        <form
          className={styles["workspace-invite__form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles["workspace-invite__email-field"]}>
            <TextBox
              type="email"
              name="email"
              label={"Введите почту пользователя"}
              placeholder="example@mail.ru"
              register={register}
              error={errors.email ? errors.email.message : ""}
            />
          </div>

          <div className={styles["workspace-invite__form-buttons"]}>
            <Button
              type="text"
              label="Отмена"
              className={styles["workspace-invite__cancel-button"]}
            ></Button>
            <Button
              type="submit"
              label="Пригласить"
              className={styles["workspace-invite__invite-button"]}
            ></Button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};
