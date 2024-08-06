import { Controller, useForm } from "react-hook-form";
import { InputField } from "../../InputField";
import { TextArea } from "../../TextArea";
import { SelectComponent } from "../../SelectComponent";
import { useCreateDocMutation } from "../../../store/docsApi";
import { useAuth } from "../../../context/AuthContext";
import { CheckBox } from "../../CheckBox";
import { ButtonComponent } from "../../ButtonComponent";
import { useGetUsersQuery as getUsers } from "../../../store/usersApi";
import { MultiSelectComponent } from "../../MultiSelectComponent";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";

export interface ICreateDocForm {
  title: string,
  number: number,
  content: string,
  authorId: number,
  typeId: string,
  availableFor: number[],
  publicDocument: boolean,
}

// const users = [
//   {
//     id: 1,
//     username: 'username1',
//     email: 'email1',
//     name: 'name1',
//     lastName: 'lastname1',
//     roles: ['ROLE_ADMIN'],
//   },
//   {
//     id: 2,
//     username: 'username2',
//     email: 'email2',
//     name: 'name2',
//     lastName: 'lastname2',
//     roles: ['ROLE_ADMIN'],
//   },
//   {
//     id: 3,
//     username: 'username3',
//     email: 'email3',
//     name: 'name3',
//     lastName: 'lastname3',
//     roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MODERATOR'],
//   },
// ];



export const CreateDocument = () => {
  const { register, control, setFocus, handleSubmit, formState: { errors }, reset, clearErrors, getValues, setValue } = useForm<ICreateDocForm>({ defaultValues: { publicDocument: false } });
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [createDoc] = useCreateDocMutation();
  const { data: users } = getUsers();
  const options = users?.map((user) => ({ label: user.name, value: user.id })) ?? [{ label: '', value: 0 }];

  const onSubmit = (data: ICreateDocForm) => {
    createDoc({ ...data, number: 12, authorId: currentUser.id });
    navigate(routes.documentsRoute());
    console.log(data);
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