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
          const userName = data.user.username;
          logIn({roles, id, userName});
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
  }, [setFocus]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative md:min-w-[400px] shadow-lg rounded-md
        bg-white dark:bg-secondaryDark
        p-4 sm:p-6 md:p-8"
      >
        <form
          className="flex flex-col gap-5 md:gap-7"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          {authFailed && !errors.password && <ErrorMessage className="bottom-14 sm:bottom-16 md:bottom-[70px]">{t('errorMessages.wrongPasswordOrUsername')}</ErrorMessage>}
          <ButtonComponent disabled={buttonDisabled} type="submit" variant="primary" className="mt-4 md:mt-0">{t('loginPage.button')}</ButtonComponent>
        </form>
      </div>
    </div>
  )
}