import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import isEqual from "lodash.isequal";
import { toast } from "react-toastify";

import { closeModal, getCurrentDataId } from "../../../store/modalSlice";
import { MultiSelectComponent } from "../../ui/MultiSelectComponent";
import { ButtonComponent } from "../../ui/ButtonComponent";
import { CheckBox } from "../../ui/CheckBox";
import { useEditFileMutation } from "../../../store/filesApi";
import { routes } from "../../../routes";
import { useGetUsersQuery as getUsers } from "../../../store/usersApi";
import { useGetFileQuery as getFile } from "../../../store/filesApi";

export interface IEditFileForm {
  available_for: number[],
  public_document: boolean,
  type_id?: any,
}

export const EditFile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector(getCurrentDataId);

  const { data: users } = getUsers();
  const {data: file } = getFile(id);
  const [editFile] = useEditFileMutation();

  const defaultValues = {
    available_for: file?.available_for,
    public_document: file?.publicEntity,
    type_id: null,
  };

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<IEditFileForm>({ defaultValues });
  const availableForOptions = users?.map((user) => ({ label: user.name, value: user.id })) ?? [{ label: '', value: 0 }];
  
  const onSubmit = (data: IEditFileForm) => {
    if (isEqual(data, defaultValues)) {
      dispatch(closeModal());
    } else {
      editFile({ data: {...data, type_id: null}, id })
        .unwrap()
        .then(() => {
          toast.success(t('files.modal.edit.toast.success'));
        })
        .catch(() => {
          toast.error(t('files.modal.edit.toast.error'));
        })
      dispatch(closeModal());
      navigate(routes.filesRoute());
    }
  };

  return (
    <form onSubmit={(handleSubmit(onSubmit))} className="flex flex-col gap-7">
      <Controller
        control={control}
        name='available_for'
        render={({ field }) => (
          <MultiSelectComponent
            {...field}
            error={errors.available_for}
            label={t('files.modal.form.labels.availableFor')}
            onChange={field.onChange}
            selectOptions={availableForOptions}
            placeholder={t('files.modal.form.placeholders.availableFor')}
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
              label={t('files.modal.form.labels.publicFile')}
              onChange={(e) => setValue('public_document', e.target.checked)}
            />
          )}
        />
        <ButtonComponent type="submit" variant="primary">{t('files.modal.edit.button')}</ButtonComponent>
      </div>
    </form>
  );
}