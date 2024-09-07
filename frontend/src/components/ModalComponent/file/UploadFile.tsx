import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetUsersQuery as getUsers } from "../../../store/usersApi";
import { CheckBox, FileInput, ButtonComponent, MultiSelectComponent } from "../../ui";
import { useUploadFileMutation } from "../../../store/filesApi";
import { closeModal } from "../../../store/modalSlice";
import { routes } from "../../../routes";

export interface IFileForm {
  file: any,
  params: {
    available_for: number[],
    public_document: boolean,
  }
}

const defaultValues = {
  params: {
    available_for: [],
    public_document: false,
  },
};

export const UploadFile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: users } = getUsers();
  const [uploadFile] = useUploadFileMutation();
  const availableForOptions = users?.map((user) => ({ label: user.name, value: user.id })) ?? [{ label: '', value: 0 }];
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<IFileForm>({ defaultValues });
  
  const onSubmit = (data: IFileForm) => {
    const fomrData = new FormData();
    fomrData.append('params', JSON.stringify(data.params));
    fomrData.append('file', data.file);
    uploadFile(fomrData)
      .unwrap()
      .then(() => {
        toast.success(t('files.modal.upload.toast.success'));
      })
      .catch(() => {
        toast.error(t('files.modal.upload.toast.error'));
      });
    dispatch(closeModal());
    navigate(routes.filesRoute());
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7" > 
      <Controller
        control={control}
        name="file"
        render={({ field }) => (
          <FileInput
            {...field}
            value={field.value?.fileName}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name='params.available_for'
        render={({ field }) => (
          <MultiSelectComponent
            {...field}
            error={errors.params?.available_for}
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
          name='params.public_document'
          render={({ field }) => (
            <CheckBox
              {...field}
              checked={!!field.value}
              label="Сделать документ публичным"
              onChange={(e) => setValue('params.public_document', e.target.checked)}
            />
          )}
        />
        <ButtonComponent type="submit" variant="primary">Загрузить файл</ButtonComponent>
      </div>
    </form>
  )
}