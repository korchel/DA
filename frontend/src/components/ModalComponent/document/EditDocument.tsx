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
  typeId: number,
  available_for: number[],
  public_document: boolean,
}

export const EditDocument = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector(getCurrentDataId);

  const { data: users } = getUsers();
  const { data: doc } = getDoc(id);
  const [editDoc, { isError }] = useEditDocMutation();

  const defaultValues = {
    title: doc?.title,
    number: doc?.number,
    content: doc?.content,
    authorId: doc?.author.idUser,
    typeId: doc?.type.id,
    available_for: doc?.available_for,
    public_document: false,
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
        name='available_for'
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
        <CheckBox label="Сделать документ публичным" {...register('public_document')} onChange={(e) => setValue('public_document', e.target.checked)} />
        <ButtonComponent type="submit" variant="primary">Сохранить изменения</ButtonComponent>
      </div>
    </form>
  );
};