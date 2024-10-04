/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
} from 'react';
import { InputLabel } from './InputLabel';
import { useTranslation } from 'react-i18next';
import { FieldError } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import clsx from 'clsx';

interface IFileInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChange: (...event: any[]) => void;
  error?: FieldError;
}

export const FileInput = ({ onChange, error, ...props }: IFileInput) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string | undefined>(
    '.pdf, .jpeg, .doc',
  ); // file types?

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    onChange(file);
    setFileName(file?.name);
  };

  return (
    <div
      className={clsx(
        error ? 'border-danger' : 'border-secondary',
        'relative border p-2 cursor-pointer rounded-sm',
        'dark:border-whiteDark',
        'text-gray dark:text-whiteDark',
      )}
    >
      <InputLabel required htmlFor='file'>
        {t('files.modal.form.labels.addFile')}
      </InputLabel>
      <div>{fileName}</div>
      <input
        id='file'
        type='file'
        className='absolute opacity-0 h-full w-full cursor-pointer inset-0 text-[0]'
        {...props}
        onChange={handleChange}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};
