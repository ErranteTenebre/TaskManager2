import React, { useContext } from "react";
import styles from "./loginForm.module.scss";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signInSchema } from "Utils/validationSchemas";

import { FormInput } from "Components/Controls";
import { LoginIcon, PassIcon } from "Components/Icons";

import { AuthContext } from "Context/AuthContext";
import { Button } from "Components/Controls/Button";

const defaultValues = {
  email: "",
  password: "",
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(signInSchema),
  });

  const { handleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="content-container">
      <div className={styles.top}>
        <h2 className="small-title">Вход</h2>
        <span className="text">
          <Link to="/auth" className="link gray underlined">
            Забыли пароль?
          </Link>
        </span>
      </div>
      <form
        className={`${styles.form}`}
        onSubmit={handleSubmit((data) => {
          handleSignIn(data, navigate);
        })}
        method="GET"
      >
        <div className={styles.inputs}>
          <FormInput
            icon={<LoginIcon />}
            type="email"
            name="email"
            placeholder="Почта"
            register={register}
            error={errors.email ? errors.email.message : ""}
          />
          <FormInput
            icon={<PassIcon />}
            type="password"
            name="password"
            placeholder="Пароль"
            register={register}
            error={errors.password ? errors.password.message : ""}
          />
        </div>

        <Button className={styles.authButton} type="submit" label="Войти" />
      </form>
      <div className={styles.footer}>
        <div className={`text gray ${styles.footerText}`}>
          У вас еще нет аккаунта?
        </div>
        <Link to="/register" className={`link blue underlined`}>
          Зарегистрируйтесь прямо сейчас!
        </Link>
      </div>
    </div>
  );
}
