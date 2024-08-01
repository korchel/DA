import { t } from "i18next";
import { ButtonComponent } from "../components/ButtonComponent";
import { InputField } from "../components/InputField";

export const SignupPage = () => {
  
  return (
    <div className="h-full flex items-center justify-center">
      <div className="shadow-lg p-6 rounded-md min-w-[400px] bg-white">
        <form id="registerForm" className="flex flex-col gap-4">
          <h1 className="text-sky-800 font-bold text-lg text-center">{t('signupPage.title')}</h1>
          <InputField
            id="username"
            placeholder={t('signupPage.placeholders.userName')}
          />
          <InputField
            type="email"
            id="email"
            placeholder={t('signupPage.placeholders.email')}
          />
          <InputField
            id="name"
            placeholder="имя оно надо?"
          />
          <InputField
            type="password"
            id="password"
            placeholder={t('signupPage.placeholders.password')}
          />
          <InputField
            type="password"
            id="password"
            placeholder={t('signupPage.placeholders.repeatPassword')}
          />
          <ButtonComponent variant="primary">Зарегистрироваться</ButtonComponent>
        </form>
      </div>
    </div>
  );
};