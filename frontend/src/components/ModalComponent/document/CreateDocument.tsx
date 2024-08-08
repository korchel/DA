import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InputField } from "../../ui/InputField";
import { TextArea } from "../../TextArea";
import { SelectComponent } from "../../SelectComponent";
import { useCreateDocMutation } from "../../../store/docsApi";
import { useAuth } from "../../../context/AuthContext";
import { CheckBox } from "../../ui/CheckBox";
import { ButtonComponent } from "../../ButtonComponent";
import { useGetUsersQuery as getUsers } from "../../../store/usersApi";
import { MultiSelectComponent } from "../../MultiSelectComponent";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/modalSlice";
import { useTranslation } from "react-i18next";

export interface ICreateDocForm {
  title: string,
  number: number,
  content: string,
  authorId: number,
  type_id: number,
  available_for: number[],
  public_document: boolean,
}

export const CreateDocument = () => {
  const { t } = useTranslation();
  const { register, control, setFocus, handleSubmit, formState: { errors }, reset, clearErrors, getValues, setValue } = useForm<ICreateDocForm>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useAuth();
  const [createDoc, { isError }] = useCreateDocMutation();
  const { data: users } = getUsers();
  const options = users?.map((user) => ({ label: user.name, value: user.id })) ?? [{ label: '', value: 0 }];

  const onSubmit = (data: ICreateDocForm) => {
    createDoc({ ...data, authorId: currentUser.id });
    console.log(data)
    if (isError) {
      toast.error(t('modal.createDocument.toast.error'));
    } else {
      toast.success(t('modal.createDocument.toast.success'));
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
        name='type_id'
        render={({ field }) => (
          <SelectComponent
            placeholder="Тип документа"
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name='available_for'
        render={({ field }) => (
          <MultiSelectComponent
            placeholder="Сделать доступным для:"
            onChange={field.onChange}
            selectOptions={options}
          />
        )}
      />
      <div className="flex justify-between">
        <CheckBox label="Сделать документ публичным" {...register('public_document')} onChange={(e) => setValue('public_document', e.target.checked)} />
        <ButtonComponent type="submit" variant="primary">Добавить документ</ButtonComponent>
      </div>
    </form>
  );
};
