import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InputField } from "../../ui/InputField";
import { TextArea } from "../../TextArea";
import { MultiSelectComponent } from "../../MultiSelectComponent";
import { SelectComponent } from "../../SelectComponent";
import { CheckBox } from "../../ui/CheckBox";
import { ButtonComponent } from "../../ButtonComponent";

import { useEditDocMutation, useGetDocQuery as getDoc } from "../../../store/docsApi";
import { useGetUsersQuery as getUsers } from "../../../store/usersApi";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, getCurrentDataId } from "../../../store/modalSlice";
import { useTranslation } from "react-i18next";

export interface IEditDocForm {
  title: string,
  number: number,
  content: string,
  authorId: number,
  typeId: string,
  availableFor: number[],
  publicDocument: boolean,
}


const doc = {
  id: 1,
  title: 'title 1',
  number: 11,
  author: {
    username: 'ghj',
  },
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  creationDate: "2024-09-04",
  updateDate: "2024-10-04",
  type: {
    id: 1,
    type: 'note'
  }
}

const users = [
  {
    id: 1,
    username: 'username1',
    email: 'email1',
    name: 'name1',
    lastName: 'lastname1',
    roles: ['ROLE_ADMIN'],
  },
  {
    id: 2,
    username: 'username2',
    email: 'email2',
    name: 'name2',
    lastName: 'lastname2',
    roles: ['ROLE_ADMIN'],
  },
  {
    id: 3,
    username: 'username3',
    email: 'email3',
    name: 'name3',
    lastName: 'lastname3',
    roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MODERATOR'],
  },
];
export const EditDocument = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector(getCurrentDataId);

  const { data: users } = getUsers();
  const { data: doc } = getDoc(id);
  const [editDoc, { isError }] = useEditDocMutation();

  const defaultValues: IEditDocForm = {
    title: doc?.title,
    number: doc?.number,
    content: doc?.content,
    authorId: doc?.author.idUser,
    typeId: doc?.type.id,
    availableFor: doc?.availableFor,
    publicDocument: false,
  };
  const options = users?.map((user) => ({ label: user.name, value: user.id })) ?? [{ label: '', value: 0 }];
  const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<IEditDocForm>({ defaultValues });
   

  const onSubmit = (data: IEditDocForm) => {
    console.log(data)
    editDoc({ data, id });
    if (isError) {
      toast.error(t('modal.editDocument.toast.error'));
    } else {
      toast.success(t('modal.editDocument.toast.success'));
    }
    dispatch(closeModal());
    navigate(routes.documentsRoute());
  };

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        placeholder="title"
        {...register('title')}
      />
      <InputField
        placeholder="number это надо?"
        {...register('number')}
      />
      <TextArea
        placeholder="content"
        {...register('content')}
      />
      <Controller
        control={control}
        name='typeId'
        render={({ field }) => (
          <SelectComponent
            placeholder="Тип документа"
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name='availableFor'
        render={({ field }) => (
          <MultiSelectComponent
            {...field}
            placeholder="Сделать доступным для:"
            onChange={field.onChange}
            selectOptions={options}
          />
        )}
      />
      <div className="flex justify-between">
        <CheckBox label="Сделать документ публичным" {...register('publicDocument')} onChange={(e) => setValue('publicDocument', e.target.checked)} />
        <ButtonComponent type="submit" variant="primary">Сохранить изменения</ButtonComponent>
      </div>
    </form>
  );
};