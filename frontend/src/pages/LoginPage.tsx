import { useForm } from 'react-hook-form';

import { ButtonComponent } from "../components/ButtonComponent"
import { InputField } from "../components/InputField"

interface ILoginData {
  username: string,
  password: string,
}

export const LoginPage = () => {
  const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<ILoginData>();

  const onSubmit = (data: ILoginData) => {
    console.log(data);
  };

  return (
    <div className="h-full flex items-center">
      <div className="mx-auto shadow-lg p-6 rounded-md min-w-[400px] bg-white">
        <form id="registerForm" className="flex flex-col gap-4 text-center" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-cyan-800 font-bold text-lg">Авторизация пользователя</h1>
          <InputField
            name="username"
            id="username"
            placeholder="Имя пользователя"
            error={errors.username}
            {...register('username', {required: {value: true, message: 'Укажите имя'}})}
          />
          <InputField
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
            error={errors.password}
            {...register('password', {required: {value: true, message: 'Введите пароль'}})}
          />
          <ButtonComponent variant="primary">Войти</ButtonComponent>

        </form>
      </div>
    </div>
  )
}