import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { InputField } from "../../ui/InputField";
import { TextArea } from "../../ui/TextArea";
import { MultiSelectComponent } from "../../MultiSelectComponent";
import { SelectComponent } from "../../SelectComponent";
import { CheckBox } from "../../ui/CheckBox";
import { ButtonComponent } from "../../ButtonComponent";
import isEqual from "lodash.isequal";

import { useEditDocMutation, useGetDocQuery as getDoc } from "../../../store/docsApi";
import { useGetUsersQuery as getUsers } from "../../../store/usersApi";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, getCurrentDataId } from "../../../store/modalSlice";
import { useTranslation } from "react-i18next";
import { editDocFormSchema, IDocForm } from "./docFormSchema";

export const EditDocument = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector(getCurrentDataId);

  const { data: users } = getUsers();
  const { data: doc } = getDoc(id);
  const [editDoc] = useEditDocMutation();

  const defaultValues = {
    title: doc?.title,
    number: doc?.number,
    content: doc?.content,
    authorId: doc?.author.idUser,
    type_id: doc?.type.id,
    available_for: doc?.available_for,
    public_document: !!doc?.public_document,
  };

  const availableForOptions = users?.map((user) => ({ label: user.name, value: user.id })) ?? [{ label: '', value: 0 }];
  const { register, control, handleSubmit, formState: { errors }, setValue, getValues } = useForm<IDocForm>({ defaultValues, resolver: zodResolver(editDocFormSchema)  });

  const onSubmit = (data: IDocForm) => {
    if (isEqual(data, defaultValues)) {
      dispatch(closeModal());
    } else {
      editDoc({ data, id })
        .unwrap()
        .then(() => {
          toast.success(t('documents.modal.edit.toast.success'));
        })
        .catch(() => {
          toast.error(t('documents.modal.edit.toast.error'));
        })
      dispatch(closeModal());
      navigate(routes.documentsRoute());
    }
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
        error={errors.number}
      />
      <InputField
        {...register('authorId')}
        label={t('documents.modal.form.labels.authorId')}
        error={errors.authorId}
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
            {...field}
            error={errors.type_id}
            placeholder={t('documents.modal.form.placeholders.type')}
            onChange={field.onChange}
            label={t('documents.modal.form.labels.type')}
          />
        )}
      />
      <Controller
        control={control}
        name='available_for'
        render={({ field }) => (
          <MultiSelectComponent
            {...field}
            error={errors.available_for}
            label={t('documents.modal.form.labels.availableFor')}
            onChange={field.onChange}
            selectOptions={availableForOptions}
            placeholder={t('documents.modal.form.placeholders.availableFor')}
            required={false}
          />
        )}
      />
      <div className="flex justify-between">
        <Controller
          control={control}
          name='public_document'
          render={({ field }) => (
            <CheckBox
              {...field}
              checked={!!field.value}
              label={t('documents.modal.form.labels.publicDocument')}
              onChange={(e) => setValue('public_document', e.target.checked)}
            />
          )}
        />
        <ButtonComponent type="submit" variant="primary">{t('documents.modal.edit.button')}</ButtonComponent>
      </div>
    </form>
  );
};