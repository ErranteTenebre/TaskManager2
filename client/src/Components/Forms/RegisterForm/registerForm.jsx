import { useContext } from "react";
import styles from "./registerForm.module.scss";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "Utils/validationSchemas";

import { FormInput } from "Components/Controls";
import { LoginIcon, PassIcon } from "Components/Icons";

import { AuthContext } from "Context/AuthContext";
import { FaUser } from "react-icons/fa";
import { Button } from "Components/Controls/Button";

const defaultValues = {
  login: "",
  email: "",
  password: "",
};

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(signUpSchema) });

  const { handleSignUp } = useContext(AuthContext);

  return (
    <div className="content-container">
      <div className={styles.top}>
        <h2 className="small-title">Регистрация</h2>
      </div>
      <form
        className={`${styles.form}`}
        method="GET"
        action="/login"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <div className={styles.inputs}>
          <FormInput
            icon={<FaUser />}
            type="text"
            name="login"
            placeholder="Логин"
            register={register}
            error={errors.login ? errors.login.message : ""}
          />
          <FormInput
            icon={<LoginIcon />}
            name="email"
            type="email"
            placeholder="Почта"
            register={register}
            error={errors.email ? errors.email.message : ""}
          />
          <FormInput
            icon={<PassIcon />}
            name="password"
            type="password"
            placeholder="Пароль"
            register={register}
            error={errors.password ? errors.password.message : ""}
          />
          {/* <FormInput
            svg={<PassIcon />}
            name="repass"
            placeholder="Повтор пароля"
          /> */}
        </div>

        <Button
          type="input"
          className={styles.registerButton}
          label="Зарегистрироваться"
        />
      </form>
      <div className={styles.footer}>
        <div className={`text gray ${styles.footerText}`}>
          У вас уже есть аккаунт?
        </div>
        <a href="/auth" className={`link blue underlined`}>
          Войти в учетную запись
        </a>
      </div>
    </div>
  );
}
