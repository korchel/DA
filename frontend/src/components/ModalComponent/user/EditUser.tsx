import { Controller, useForm } from "react-hook-form";
import { RoleName } from "../../../interfaces";
import { InputField } from "../../ui/InputField";
import { CheckBox } from "../../ui/CheckBox";
import { useEditUserMutation } from "../../../store/usersApi";
import { useSelector } from "react-redux";
import { getCurrentDataId } from "../../../store/modalSlice";
import { ButtonComponent } from "../../ButtonComponent";

interface IEditUserForm {
  username: string,
  email: string,
  name: string,
  lastName: string,
  roles: RoleName[],
}

export const EditUser = () => {
  const { register, control, setFocus, handleSubmit, formState: { errors }, reset, clearErrors, getValues, setValue } = useForm<IEditUserForm>();
  const id = useSelector(getCurrentDataId);
  const [editUser] = useEditUserMutation();

  const onSubmit = (data) => {
    console.log(data)
  };

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
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
      <fieldset>
        <Controller
          control={control}
          name='roles'
          render={({ field }) => (
            <CheckBox
              label="Администратор"
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
              setValue={setValue}
            />
          )}
        />
        <Controller
          control={control}
          name='roles'
          render={({ field }) => (
            <CheckBox
              label="Модератор"
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
              setValue={setValue}
            />
          )}
        />
        <Controller
          control={control}
          name='roles'
          render={({ field }) => (
            <CheckBox
              label="Пользователь"
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
              setValue={setValue}
            />
          )}
        />
      </fieldset>
      <ButtonComponent type="submit" variant="primary">Сохранить изменения</ButtonComponent>
    </form>
  );
};