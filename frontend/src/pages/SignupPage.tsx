import { ButtonComponent } from "../components/ButtonComponent";
import { InputField } from "../components/InputField";

export const SignupPage = () => {
  
  return (
    <div className="h-full flex items-center">
      <div className="mx-auto shadow-lg p-6 rounded-md min-w-[400px] bg-white">
        <form id="registerForm" className="flex flex-col gap-4">
          <h1 className="text-cyan-800 font-bold text-lg text-center">Регистрация пользователя</h1>
          <InputField
            name="username"
            id="username"
            placeholder="Имя пользователя"
          />
          <InputField
            type="email"
            name="email"
            id="email"
            placeholder="email"
          />
          <InputField
            name="name"
            id="name"
            placeholder="имя"
          />
          <InputField
            type="password"
            name="password"
            id="password"
            placeholder="пароль"
          />
          <ButtonComponent variant="primary">Зарегистрироваться</ButtonComponent>
        </form>
      </div>
    </div>
  );
};