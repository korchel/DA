import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { InputField } from "../../ui/InputField";
import { TextArea } from "../../TextArea";
import { SelectComponent } from "../../SelectComponent";
import { CheckBox } from "../../ui/CheckBox";
import { useCreateDocMutation } from "../../../store/docsApi";
import { useAuth } from "../../../context/AuthContext";
import { ButtonComponent } from "../../ButtonComponent";
import { useGetUsersQuery as getUsers } from "../../../store/usersApi";
import { MultiSelectComponent } from "../../MultiSelectComponent";
import { routes } from "../../../routes";
import { closeModal } from "../../../store/modalSlice";
import { docFormSchema, IDocForm } from "./docFormSchema";

export const CreateDocument = () => {
  const { t } = useTranslation();
  const { register, control, setFocus, handleSubmit, formState: { errors }, reset, clearErrors, getValues, setValue } = useForm<IDocForm>({ resolver: zodResolver(docFormSchema) });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useAuth();
  const [createDoc, { isError }] = useCreateDocMutation();
  const { data: users } = getUsers();
  const options = users?.map((user) => ({ label: user.name, value: user.id })) ?? [{ label: '', value: 0 }];

  const onSubmit = (data: IDocForm) => {
    createDoc({ ...data, authorId: currentUser.id as number});

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
        placeholder={t('modal.createDocument.placeHolders.title')}
        error={errors.title}
        {...register('title')}
      />
      <InputField
        placeholder={t('modal.createDocument.placeHolders.number')}
        error={errors.number}
        {...register('number')}
      />
      <TextArea
        placeholder={t('modal.createDocument.placeHolders.content')}
        {...register('content')}
      />
      <Controller
        control={control}
        name='type_id'
        render={({ field }) => (
          <SelectComponent
            placeholder={t('modal.createDocument.placeHolders.type')}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name='available_for'
        render={({ field }) => (
          <MultiSelectComponent
            placeholder={t('modal.createDocument.placeHolders.availableFor')}
            onChange={field.onChange}
            selectOptions={options}
          />
        )}
      />
      <div className="flex justify-between">
        <CheckBox label="Сделать документ публичным" {...register('public_document')} onChange={(e) => setValue('public_document', e.target.checked)} />
        <ButtonComponent type="submit" variant="primary">{t('modal.createDocument.button')}</ButtonComponent>
      </div>
    </form>
  );
};
