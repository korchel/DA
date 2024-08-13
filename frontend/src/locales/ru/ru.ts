import { documents } from "./documents";
import { files } from "./files";
import { signupPage } from "./signupPage";
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
    
    notFoundPage: {
      title: 'Страница не найдена',
      button: 'На главную',
    },
    errorMessages: {
      reuired: 'Обязательное поле',
      passwordLength: 'Длина пароля должна быть от 8 до 14 символов',
      confirmPassword: 'Пароли должны совпадать',
      wrongPasswordOrUsername: 'Неправильное имя пользователя или пароль',
      userExists: 'Такой пользователь или адрес электронной почты уже зар',
      inValidEmail: 'Невалидный адрес электронной почты',
    },
  signupPage,
  documents,
  files,
  users,
  cancel: 'Отмена',
  delete: 'Удалить',
  download: 'Скачать',
  see: 'Посмотреть',
  edit: 'Изменить',
};