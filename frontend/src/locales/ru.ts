import { FilesPage } from "../pages/files/FilesPage";
import { UserDetailsPage } from "../pages/users/UserDetailsPage";

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
    usersPage: {
      tableHeader: {
        userName: 'Имя пользователя',
        name: 'Имя',
        lastName: 'Фамилия',
        roles: 'Роли',
      }
    },
  documentsPage: {
    title: 'Список документов',
    createDocument: 'Создать документ',
    tableHeader: {
      number: 'Номер',
      name: 'Название',
      author: 'Автор',
      type: 'Тип',
      content: 'Содержание',
      creationDate: 'Дата создания',
      updateDate: 'Дата обновления',
      actions: 'Действия',
    }
  },
  filesPage: {
    title: 'Список файлов',
    addFile: 'Добавить файл',
    tableHeader: {
      fileName: 'Название',
      author: 'Автор',
      fileType: 'Тип',
      creationDate: 'Дата создания',
      updateDate: 'Дата обновления',
      actions: 'Действия',
    }
  },
  modal: {
    deleteUser: {
      areYouSure: 'Вы уверены, что хотите удалить этого пользователя?',
      toast: {
        error: "Произошла ошибка",
        success: "Пользователь удален",
      }
    },
    editUser: {
      toast: {
        error: "Произошла ошибка",
        success: "Данные пользователя изменены",
      }
    },
    deleteDocument: {
      areYouSure: 'Вы уверены, что хотите удалить эту запись?',
      toast: {
        error: "Произошла ошибка",
        success: "Запись удалена",
      }
    },
    createDocument: {
      toast: {
        error: "Произошла ошибка",
        success: "Документ создан",
      }
    },
    editDocument: {
      toast: {
        error: "Произошла ошибка",
        success: "Документ изменен",
      }
    },
    deleteFile: {
      areYouSure: 'Вы уверены, что хотите удалить этот файл?',
      toast: {
        error: "Произошла ошибка",
        success: "Файл удален",
      }
    },
    cancel: 'Отмена',
    delete: 'Удалить',
  },
  documentDetailsPage: {
    title: 'Информация о документе ',
    number: 'Номер: ',
    author: 'Автор: ',
    type: 'Тип: ',
    content: 'Содержание: ',
    creationDate: 'Дата создания: ',
    updateDate: 'Дата обновления: ',
    delete: 'Удалить документ',
    edit: 'Изменить документ',
  },
  userDetailsPage: {
    title: 'Информация о пользователе ',
    username: 'Имя пользователя: ',
    name: 'Имя: ',
    lastName: 'Фамилия: ',
    email: 'e-mail: ',
    roles: 'Роли: ',
    delete: 'Удалить пользователя',
    edit: 'Редактировать данные',
  },
};