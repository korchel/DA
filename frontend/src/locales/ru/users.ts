export const users = {
  tableHeader: {
    userName: 'Имя пользователя',
    name: 'Имя',
    lastName: 'Фамилия',
    roles: 'Роли',
  },
  roles: {
    ROLE_ADMIN: 'Администартор',
    ROLE_USER: 'Пользователь',
    ROLE_MODERATOR: 'Модератор',
  },
  detailsPage: {
    title: 'Информация о пользователе ',
    username: 'Имя пользователя: ',
    name: 'Имя: ',
    lastName: 'Фамилия: ',
    email: 'e-mail: ',
    roles: 'Роли: ',
    delete: 'Удалить пользователя',
    edit: 'Редактировать данные',
  },
  modal: {
    form: {
      labels: {
        username: 'Имя пользователя',
        email: 'Адрес электронной почты',
        name: 'Имя',
        lastname: 'Фамилия',
      },
      plaveholders: {

      },
    },
    edit: {
      toast: {
        error: "Произошла ошибка",
        success: "Данные пользователя изменены",
      },
      button: 'Сохранить изменения',
    },
    delete: {
      areYouSure: 'Вы уверены, что хотите удалить этого пользователя?',
      toast: {
        error: "Произошла ошибка",
        success: "Пользователь удален",
      }
    },
  }
};