import * as Yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

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

export const createTaskSchema = Yup.object({
  title: Yup.string()
    .required("Необходимо ввести логин!")
    .min(6, "Минимальная длина заголовка 6 символов!"),
  description: Yup.string()
    .required("Необходимо ввести почту!")
    .max(1000, "Максимальная длина описания - 1000 символов!"),
  date: Yup.date()
    .nullable()
    .notRequired()
    .test("future-date", "Дата не может быть в прошлом!", function (value) {
      return !value || value >= new Date();
    }),
});

export const inviteSchema = Yup.object({
  email: Yup.string().required("Необходимо ввести почту!"),
});
