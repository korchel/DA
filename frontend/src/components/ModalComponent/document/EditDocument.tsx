import { Controller, useForm } from "react-hook-form";
import { InputField } from "../../ui/InputField";
import { TextArea } from "../../TextArea";
import { MultiSelectComponent } from "../../MultiSelectComponent";
import { SelectComponent } from "../../SelectComponent";
import { CheckBox } from "../../ui/CheckBox";
import { ButtonComponent } from "../../ButtonComponent";

import { useUpdateDocMutation as updateDoc, useGetDocQuery as getDoc } from "../../../store/docsApi";
import { useGetUsersQuery as getUsers } from "../../../store/usersApi";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import { useSelector } from "react-redux";
import { getCurrentDataId } from "../../../store/modalSlice";

export interface ICreateDocForm {
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
  const navigate = useNavigate();
  const { register, control, setFocus, handleSubmit, formState: { errors }, reset, clearErrors, getValues, setValue } = useForm<ICreateDocForm>({ defaultValues: { publicDocument: false } });
  const { data: users } = getUsers();
  const options = users?.map((user) => ({ label: user.name, value: user.id })) ?? [{ label: '', value: 0 }];
   
  const id = useSelector(getCurrentDataId);
  // const { data: doc } = getDoc(id);

  const onSubmit = (data) => {
    console.log(data)
    // updateDoc(data);
    // navigate(routes.documentsRoute());
  };

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        placeholder="title"
        value={doc.title}
        {...register('title')}
      />
      <InputField
        placeholder="number это надо?"
        value={doc.number}
        {...register('number')}
      />
      <TextArea
        placeholder="content"
        value={doc.content}
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
            placeholder="Сделать доступным для:"
            onChange={field.onChange}
            selectOptions={options}
          />
        )}
      />
      <div className="flex justify-between">
        <CheckBox
          setValue={setValue}
          label="Сделать документ публичным"
          {...register('publicDocument')}
        />
        <ButtonComponent type="submit" variant="primary">Добавить документ</ButtonComponent>
      </div>
    </form>
  );
};