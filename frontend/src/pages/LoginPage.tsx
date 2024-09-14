import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonComponent, InputField, ErrorMessage, Title } from "../components/ui";
import { routes } from '../routes';
import { useAuth } from '../context/AuthContext';

interface ILoginData {
  username: string,
  password: string,
}

export const LoginPage = () => {
  const { t } = useTranslation();
  const { register, setFocus, handleSubmit, formState: { errors } } = useForm<ILoginData>();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [authFailed, setauthFailed] = useState<boolean>(false);

  const onSubmit = (data: ILoginData) => {
    setauthFailed(false);
    setButtonDisabled(true);
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
        if (data.user) {
          const roles = data.user.roles.map((role) => role.name);
          const id = data.user.idUser;
          logIn({roles, id});
          navigate(routes.documentsRoute());
        } else {
          if (data.status === 400) {
            setauthFailed(true);
            setButtonDisabled(false)
          }
        }
      })
      .catch((error) => { console.log(error); });
  };

  useEffect(() => {
    setFocus('username');
  });

  return (
    <div className="h-full flex items-center justify-center">
      <div className="shadow-lg p-6 rounded-md min-w-[400px] bg-white dark:bg-secondaryDark relative">
        <form id="registerForm" className="flex flex-col gap-7 text-center" onSubmit={handleSubmit(onSubmit)}>
          <Title>{t('loginPage.title')}</Title>
          <InputField
            autoComplete="on"
            placeholder={t('loginPage.placeholders.userName')}
            error={errors.username}
            {...register('username', {
              required: {
                value: true, message: t('errorMessages.reuired'),
              },
            })}
          />
          <InputField
            autoComplete="on"
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
          {authFailed && <ErrorMessage className="bottom-16">{t('errorMessages.wrongPasswordOrUsername')}</ErrorMessage>}
          <ButtonComponent disabled={buttonDisabled} type="submit" variant="primary">{t('loginPage.button')}</ButtonComponent>
        </form>
      </div>
    </div>
  )
}