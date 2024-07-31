import { useForm } from 'react-hook-form';

import { ButtonComponent } from "../components/ButtonComponent"
import { InputField } from "../components/InputField"
import { routes } from '../routes';
import { useTranslation } from 'react-i18next';

interface ILoginData {
  username: string,
  password: string,
}

export const LoginPage = () => {
  const { t } = useTranslation();
  const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<ILoginData>();

  const onSubmit = (data: ILoginData) => {
    fetch(routes.loginPath(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="shadow-lg p-6 rounded-md min-w-[400px] bg-white">
        <form id="registerForm" className="flex flex-col gap-4 text-center" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-cyan-800 font-bold text-lg">{t('loginPage.title')}</h1>
          <InputField
            id="username"
            placeholder={t('loginPage.placeholders.userName')}
            error={errors.username}
            {...register('username', {required: {value: true, message: 'Укажите имя'}})}
          />
          <InputField
            type="password"
            id="password"
            placeholder={t('loginPage.placeholders.password')}
            error={errors.password}
            {...register('password', {required: {value: true, message: 'Введите пароль'}})}
          />
          <ButtonComponent variant="primary">{t('loginPage.button')}</ButtonComponent>

        </form>
      </div>
    </div>
  )
}