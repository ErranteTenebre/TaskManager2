import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .required("Необходимо ввести почту!")
    .max(25, "Максимальная длина почты 100 символов!"),
  password: Yup.string()
    .required("Необходимо ввести пароль!")
    .min(6, "Минимальная длина пароля 6 символов!")
    .max(50, "Максимальная длина пароля 50 символов!"),
});

export const signUpSchema = Yup.object({
  login: Yup.string()
    .required("Необходимо ввести логин!")
    .min(6, "Минимальная длина логина 6 символов!")
    .max(40, "Максимальная длина пароля 40 символов!"),
  email: Yup.string()
    .required("Необходимо ввести почту!")
    .max(25, "Максимальная длина - 100"),
  password: Yup.string()
    .required("Необходимо ввести пароль!")
    .min(6, "Пароль слишком короткий - минимум 6 символа")
    .max(50, "Максимальная длина - 50 символов"),
});
