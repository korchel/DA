import { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { InputLabel } from "./InputLabel";
import { useTranslation } from "react-i18next";

interface IFileInput  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onChange:  (...event: any[]) => void,
}

export const FileInput = ({ onChange, ...props }: IFileInput) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string | undefined>('.pdf, .jpeg, .doc'); // file types?

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    onChange(file);
    setFileName(file?.name);
  };

  return (
    <div className="relative border p-2 cursor-pointer border-gray text-gray">
      <InputLabel required htmlFor="file">{t('files.modal.form.labels.addFile')}</InputLabel>
      <div>{fileName}</div>
      <input id='file' type="file" className="absolute opacity-0 h-full w-full cursor-pointer inset-0 text-[0]" {...props} onChange={handleChange} />
    </div>
    
  );
};