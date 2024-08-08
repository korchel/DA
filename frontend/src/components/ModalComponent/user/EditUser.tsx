import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RoleName } from "../../../interfaces";
import { InputField } from "../../ui/InputField";
import { CheckBox } from "../../ui/CheckBox";
import { useEditUserMutation } from "../../../store/usersApi";
import { useSelector } from "react-redux";
import { getCurrentDataId } from "../../../store/modalSlice";
import { ButtonComponent } from "../../ButtonComponent";
import { useTranslation } from "react-i18next";

interface IEditUserForm {
  username: string,
  email: string,
  name: string,
  lastName: string,
  roles: string[],
}

const roles = [
  { label: "Администратор", value: 'ROLE_ADMIN' },
  { label: "Пользователь", value: 'ROLE_USER' },
  { label: "Модератор", value: 'ROLE_MODERATOR' },
];

export const EditUser = () => {
  const { t } = useTranslation();
  const { register, control, setFocus, handleSubmit, formState: { errors }, reset, clearErrors, getValues, setValue } = useForm<IEditUserForm>({defaultValues: {roles: []}});
  const id = useSelector(getCurrentDataId);
  const [editUser, { isError }] = useEditUserMutation();

  const onSubmit = (data) => {
    console.log(data)
    if (isError) {
      toast.error(t('modal.editUser.toast.error'));
    } else {
      toast.success(t('modal.editUser.toast.success'));
    }
  };

  const handleCheck = (e) => {
    const values = getValues('roles')
    setValue('roles', [...values, e.target.value]);
  }

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
        {roles.map((role) => (
          <CheckBox {...register('roles')} label={role.label} value={role.value} onChange={(e) => handleCheck(e)}/>
        ))}
      </fieldset>
        
      <ButtonComponent type="submit" variant="primary">Сохранить изменения</ButtonComponent>
    </form>
  );
};