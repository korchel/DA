import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ChangeEventHandler } from 'react';

import { InputField, CheckBox, ButtonComponent, Title } from '../../ui';
import {
  useEditUserMutation,
  useGetUserQuery as getUser,
} from '../../../store/usersApi';
import { closeModal, getCurrentDataId } from '../../../store/modalSlice';
import { routes } from '../../../routes';
import { useAuth } from '../../../context/AuthContext';
import { defineAbilityFor } from '../../../casl/ability';
import { Can } from '@casl/react';

export interface IEditUserForm {
  username: string;
  email: string;
  name: string;
  lastName: string;
  role_ids: number[];
}

const roles = [
  { label: 'Администратор', value: 1 },
  { label: 'Пользователь', value: 3 },
  { label: 'Модератор', value: 2 },
];

export const EditUser = () => {
  const { t } = useTranslation();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector(getCurrentDataId);

  const { data: user } = getUser(id);
  const [editUser] = useEditUserMutation();

  const ability = defineAbilityFor({
    user: { ...currentUser, isAuthenticated },
  });

  const defaultValues = {
    username: user?.username,
    email: user?.email,
    name: user?.name,
    lastName: user?.lastname,
    role_ids: user?.roles.map((role) => role.idRole),
  };

  const { register, control, handleSubmit, getValues, setValue } =
    useForm<IEditUserForm>({ defaultValues });

  const onSubmit = (data: IEditUserForm) => {
    editUser({ data, id })
      .unwrap()
      .then(() => {
        toast.success(t('users.modal.edit.toast.success'));
      })
      .catch(() => {
        toast.error(t('users.modal.edit.toast.error'));
      });
    dispatch(closeModal());
    navigate(routes.userDetailsRoute(id));
  };

  const handleCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked, value } = e.target;
    const roles = getValues('role_ids');
    if (checked) {
      setValue('role_ids', [...roles, Number(value)]);
    } else {
      setValue(
        'role_ids',
        roles.filter((role) => role !== Number(value)),
      );
    }
  };

  return (
    <form
      className='flex flex-col gap-3 sm:gap-5 md:gap-7'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title>{t('users.modal.title.edit')}</Title>
      <InputField
        label={t('users.modal.form.labels.username')}
        {...register('username')}
      />
      <InputField
        label={t('users.modal.form.labels.email')}
        {...register('email')}
      />
      <InputField
        label={t('users.modal.form.labels.name')}
        {...register('name')}
      />
      <InputField
        label={t('users.modal.form.labels.lastname')}
        {...register('lastName')}
      />
      <Can I='edit' a='role' ability={ability}>
        <fieldset>
          {roles.map((role) => (
            <Controller
              key={role.value}
              control={control}
              name='role_ids'
              render={({ field }) => (
                <CheckBox
                  {...field}
                  label={role.label}
                  checked={field.value?.includes(role.value)}
                  value={role.value}
                  onChange={(e) => handleCheck(e)}
                />
              )}
            />
          ))}
        </fieldset>
      </Can>
      <ButtonComponent type='submit' variant='primary'>
        {t('users.modal.edit.button')}
      </ButtonComponent>
    </form>
  );
};
