import { useForm } from 'react-hook-form';

import { ButtonComponent } from "../components/ButtonComponent"
import { InputField } from "../components/ui/InputField"
import { routes } from '../routes';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ILoginData {
  username: string,
  password: string,
}

export const LoginPage = () => {
  const { t } = useTranslation();
  const { register, control, setFocus, handleSubmit, formState: { errors }, reset, clearErrors, getValues } = useForm<ILoginData>();
  const ref = useRef(null);
  const { logIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: ILoginData) => {
    fetch(routes.loginPath(), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const roles = data.user.roles.map((role) => role.name);
        const id = data.user.idUser;
        logIn({roles, id});
        navigate(routes.documentsRoute());
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setFocus('username');
  });

  return (
    <div className="h-full flex items-center justify-center">
      <div className="shadow-lg p-6 rounded-md min-w-[400px] bg-white">
        <form id="registerForm" className="flex flex-col gap-7 text-center" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-sky-800 font-bold text-lg">{t('loginPage.title')}</h1>
          <InputField
            placeholder={t('loginPage.placeholders.userName')}
            error={errors.username}
            {...register('username', {
              required: {
                value: true, message: t('errorMessages.reuired'),
              },
            })}
          />
          <InputField
            type="password"
            showActionButton
            placeholder={t('loginPage.placeholders.password')}
            error={errors.password}
            {...register('password', {
              required: {
                value: true, message: t('errorMessages.reuired')
              },
              minLength: {
                value: 8,
                message: t('errorMessages.passwordLength'),
              },
              maxLength: {
                value: 14,
                message: t('errorMessages.passwordLength'),
              }
            })}
          />
          <ButtonComponent type="submit" variant="primary">{t('loginPage.button')}</ButtonComponent>
        </form>
      </div>
    </div>
  )
}