import { ButtonComponent } from "../components/ButtonComponent";
import { InputField } from "../components/ui/InputField";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { routes } from "../routes";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ISignupData {
  name: string, //???? lastname?
  username: string,
  email: string,
  password: string,
  passwordConfirm: string,
}

export const SignupPage = () => {
  const { t } = useTranslation();
  const { logIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { register, control, setFocus, handleSubmit, formState: { errors }, reset, clearErrors, getValues } = useForm<ISignupData>();

  const onSubmit = (data: ISignupData) => {
    fetch(routes.signupPath(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const roles = data.user.roles.map((role) => role.name);
        const id = data.id;
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
        <form id="registerForm" className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="text-sky-800 font-bold text-lg text-center">{t('signupPage.title')}</h1>
          <InputField
            placeholder={t('signupPage.placeholders.userName')}
            error={errors.username}
            {...register('username', {required: {value: true, message: t('errorMessages.reuired')}})}
          />
          <InputField
            type="email"
            placeholder={t('signupPage.placeholders.email')}
            error={errors.email}
            {...register('email', {
              required: {
                value: true, message: t('errorMessages.reuired')
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                message: "Please Enter A Valid Email!"
              },
            })}
          />
          <InputField
            placeholder="имя оно надо?"
            {...register('name')}
          />
          <InputField
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
            type="password"
            placeholder={t('signupPage.placeholders.repeatPassword')}
            error={errors.passwordConfirm}
            {...register('passwordConfirm', {
              validate: (value) => {
                const password = getValues("password");
                return value === password || t('errorMessages.confirmPassword');
              },
            })}
          />
          <ButtonComponent type="submit" variant="primary">{t('signupPage.button')}</ButtonComponent>
        </form>
      </div>
    </div>
  );
};