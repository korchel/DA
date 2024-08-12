import { documents } from "./documents";
import { files } from "./files";
import { users } from "./users";


export const ru = {
    header: {
      login: 'Войти',
      logout: 'Выйти',
      register: 'Регистрация',
      nav: {
        search: 'Поиск',
        profile: 'Профиль',
        files: 'Файлы',
        documents: 'Документы',
        users: 'Пользователи',
      },
    },
    loginPage: {
      title: 'Авторизация пользователя',
      button: 'Войти',
      placeholders: {
        userName: 'Имя пользователя',
        password: 'Пароль',
      },
    },
    signupPage:{
      title: 'Регистрация пользователя',
      button: 'Зарегистрироваться',
      placeholders: {
        userName: 'Имя пользователя',
        lastName: 'Имя пользователя',
        email: 'e-mail',
        password: 'Пароль',
        repeatPassword: 'Подтвердите пароль',
      }
    },
    notFoundPage: {
      title: 'Страница не найдена',
      button: 'На главную',
    },
    errorMessages: {
      reuired: 'Обязательное поле',
      passwordLength: 'Длина пароля должна быть от 8 до 14 символов',
      confirmPassword: 'Пароли должны совпадать',
    },
    
  documents,
  files,
  users,
  cancel: 'Отмена',
  delete: 'Удалить',
  download: 'Скачать',
  see: 'Посмотреть',
  edit: 'Изменить',
};