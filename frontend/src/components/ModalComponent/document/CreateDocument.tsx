import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { InputField } from "../../ui/InputField";
import { TextArea } from "../../ui/TextArea";
import { SelectComponent } from "../../SelectComponent";
import { CheckBox } from "../../ui/CheckBox";
import { useCreateDocMutation } from "../../../store/docsApi";
import { useAuth } from "../../../context/AuthContext";
import { ButtonComponent } from "../../ButtonComponent";
import { useGetUsersQuery as getUsers } from "../../../store/usersApi";
import { MultiSelectComponent } from "../../MultiSelectComponent";
import { routes } from "../../../routes";
import { closeModal } from "../../../store/modalSlice";
import { createDocFormSchema, IDocForm } from "./docFormSchema";

export const CreateDocument = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const {
    register, control, handleSubmit, formState: { errors }, setValue
  } = useForm<IDocForm>({ defaultValues: { public_document: false, available_for: [] }, resolver: zodResolver(createDocFormSchema) });


  const [createDoc] = useCreateDocMutation();
  const { data: users } = getUsers();
  const options = users?.map((user) => ({ label: user.name, value: user.id })) ?? [{ label: '', value: 0 }];

  const onSubmit = (data: IDocForm) => {
    createDoc({ ...data, authorId: currentUser.id as number })
      .unwrap()
      .then(() => {
        toast.success(t('documents.modal.create.toast.success'));
      })
      .catch(() => {
        toast.error(t('documents.modal.create.toast.error'));
      });
    dispatch(closeModal());
    navigate(routes.documentsRoute());
  };

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        {...register('title')}
        label={t('documents.modal.form.labels.title')}
        error={errors.title}
      />
      <InputField
        {...register('number')}
        label={t('documents.modal.form.labels.number')}
        placeholder={t('documents.modal.form.placeholders.number')}
        error={errors.number}
        type='number'
      />
      <TextArea
        {...register('content')}
        label={t('documents.modal.form.labels.content')}
        error={errors.content}
      />
      <Controller
        control={control}
        name='type_id'
        render={({ field }) => (
          <SelectComponent
            placeholder={t('documents.modal.form.placeholders.type')}
            error={errors.type_id}
            label={t('documents.modal.form.labels.type')}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name='available_for'
        render={({ field }) => (
          <MultiSelectComponent
            error={errors.available_for}
            placeholder={t('documents.modal.form.placeholders.availableFor')}
            label={t('documents.modal.form.labels.availableFor')}
            onChange={field.onChange}
            selectOptions={options}
            required={false}
          />
        )}
      />
      <div className="flex justify-between">
        <CheckBox
          label={t('documents.modal.form.labels.publicDocument')}
          {...register('public_document')}
          onChange={(e) => setValue('public_document', e.target.checked)}
        />
        <ButtonComponent type="submit" variant="primary">{t('documents.modal.create.button')}</ButtonComponent>
      </div>
    </form>
  );
};
