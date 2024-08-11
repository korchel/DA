import { Controller, useForm } from "react-hook-form"
import { MultiSelectComponent } from "../../MultiSelectComponent"
import { useGetUsersQuery as getUsers } from "../../../store/usersApi";
import { CheckBox } from "../../ui/CheckBox";
import { ButtonComponent } from "../../ButtonComponent";
import { useUploadFileMutation } from "../../../store/filesApi";
import { ChangeEventHandler } from "react";
import { t } from "i18next";

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
  }
}

export const UploadFile = () => {

  const { data: users } = getUsers();
  const [uploadFile] = useUploadFileMutation();
  const availableForOptions = users?.map((user) => ({ label: user.name, value: user.id })) ?? [{ label: '', value: 0 }];
  const { register, control, handleSubmit, formState: { errors }, setValue, getValues } = useForm<IFileForm>({ defaultValues });
  
  const onSubmit = (data: IFileForm) => {
    const fomrData = new FormData();
    fomrData.append('params', JSON.stringify(data.params));
    fomrData.append('file', data.file);
    uploadFile(fomrData)
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7" > 
      <Controller
        control={control}
        name="file"
        render={({ field }) => (
          <input
            {...field}
            value={field.value?.fileName}
            onChange={(e) => field.onChange(e.target.files?.[0])}
            type="file"
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
            placeholder="dsdg"
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