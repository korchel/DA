import { ButtonComponent } from "../components/ui/ButtonComponent";
import { InputField } from "../components/ui/InputField";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { routes } from "../routes";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../components/ui/ErrorMessage";

interface ISignupData {
  name: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  passwordConfirm: string,
}

export const SignupPage = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const { register, setFocus, handleSubmit, formState: { errors }, getValues } = useForm<ISignupData>();
  const [signupFailed, setSignupFailed] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSubmit = (data: ISignupData) => {
    setSignupFailed(false);
    setButtonDisabled(true);
    fetch(routes.signupPath(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        if (data.user) {
          const roles = data.user.roles.map((role) => role.name);
          const id = data.id;
          logIn({roles, id});
          navigate(routes.documentsRoute());
        } else {
          if (data.status === 400) {
            setSignupFailed(true);
            setButtonDisabled(false)
          }
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setFocus('username');
  });

  return (
    <div className="h-full flex items-center justify-center">
      <div className="shadow-lg p-6 rounded-md min-w-[400px] bg-white">
        <form id="registerForm" className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="text-sky-600 font-bold text-lg text-center">{t('signupPage.title')}</h1>
          <InputField
            placeholder={t('signupPage.placeholders.username')}
            error={errors.username}
            {...register('username', {required: {value: true, message: t('errorMessages.reuired')}})}
          />
          <InputField
            autoComplete="on"
            type="email"
            placeholder={t('signupPage.placeholders.email')}
            error={errors.email}
            {...register('email', {
              required: {
                value: true, message: t('errorMessages.reuired'),
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                message: t('errorMessages.inValidEmail'),
              },
            })}
          />
          <InputField
            placeholder={t('signupPage.placeholders.name')}
            error={errors.name}
            {...register('name', {required: {value: true, message: t('errorMessages.reuired')}})}
          />
          <InputField
            autoComplete="off"
            placeholder={t('signupPage.placeholders.lastname')}
            {...register('lastname')}
          />
          <InputField
            autoComplete="new-password"
            type="password"
            placeholder={t('signupPage.placeholders.password')}
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
          <InputField
            autoComplete="new-password"
            type="password"
            placeholder={t('signupPage.placeholders.repeatPassword')}
            error={errors.passwordConfirm}
            {...register('passwordConfirm', {
              required: {
                value: true, message: t('errorMessages.reuired')
              },
              validate: (value) => {
                const password = getValues("password");
                return value === password || t('errorMessages.confirmPassword');
              },
            })}
          />
          {signupFailed && <ErrorMessage className="bottom-16">{t('errorMessages.userExists')}</ErrorMessage>}
          <ButtonComponent disabled={buttonDisabled} type="submit" variant="primary">{t('signupPage.button')}</ButtonComponent>
        </form>
      </div>
    </div>
  );
};