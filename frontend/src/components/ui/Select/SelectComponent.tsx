import { ForwardedRef, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import Select, { ClassNamesConfig, GroupBase } from 'react-select';
import clsx from 'clsx';

import { InputLabel } from '../InputLabel';
import { ErrorMessage } from '../ErrorMessage';
import { ISelectOption, onSelect } from './interfaces';
import { EmotionCacheProvider } from './EmotionProvider';
import { classNames } from './styles';

interface ISelectInputProps {
  onChange: (option: number) => void,
  placeholder: string,
  selectOptions: ISelectOption[],
  error?: FieldError,
  value: number,
  label?: string,
  required?: boolean,
}

export const SelectComponent = forwardRef(({ onChange, placeholder, selectOptions, label, error, value, ...props }: ISelectInputProps, ref: ForwardedRef<HTMLSelectElement>) => {
  const handleSelect: onSelect = (option) => {
    const _option = option as ISelectOption;
    onChange(_option.value);
  };

  return (
    <EmotionCacheProvider>
      <div className='relative'>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value ? selectOptions.find(option => option.value === value) : undefined}
          classNames={classNames}
          onChange={handleSelect}
          options={selectOptions}
          placeholder={placeholder}
          {...props}
        />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </div>
    </EmotionCacheProvider>
  );
});