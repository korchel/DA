import { useForm } from "react-hook-form";
import { RoleName } from "../../../interfaces";
import { InputField } from "../../ui/InputField";

interface ICreateUserForm {
  username: string,
  email: string,
  name: string,
  lastName: string,
  roles: RoleName[],
}

export const CreateUser = () => {
  const { register, control, setFocus, handleSubmit, formState: { errors }, reset, clearErrors, getValues, setValue } = useForm<ICreateUserForm>();
  return (
    <form>
      <InputField
        placeholder="Имя пользователя"
        {...register('username')}
      />
      <InputField
        placeholder="email"
        {...register('email')}
      />
      <InputField
        placeholder="Имя"
        {...register('name')}
      />
      <InputField
        placeholder="Фамилия"
        {...register('lastName')}
      />
    </form>
  )
};