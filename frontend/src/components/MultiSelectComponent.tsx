import { ForwardedRef, forwardRef, useState,  } from 'react';
import { FieldError, Merge, UseFormSetValue } from 'react-hook-form';
import Select, { type StylesConfig, type ActionMeta } from 'react-select';
import { InputLabel } from './ui/InputLabel';

interface ISelectOption {
  label: string,
  value: number,
}

interface ISelectInputProps {
  onChange: (option: ISelectOption) => void,
  selectOptions: ISelectOption[],
  placeholder: string,
  className?: string,
  error?: Merge<FieldError, (FieldError | undefined)[]>,
  value?: number[],
  label: string,
  required?: boolean,
}

type onSelect = (newValue: unknown, actionmeta: ActionMeta<unknown>) => void;

export const MultiSelectComponent = ({onChange, selectOptions, label, placeholder, error, value, required = true, ...props}: ISelectInputProps) => {
  const handleSelect = (options: any) => {
    if (options.length > 0) {
      return onChange(options.map((option: any) => option.value));
    }
    return onChange(options.value)
  }
  return (
    <div className='relative'>
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        onChange={handleSelect}
        options={selectOptions}
        placeholder={placeholder}
        isMulti
        value={value ? selectOptions.filter((option) => value.includes(option.value) ) : undefined}
        {...props}
      />
      {error && <p className="absolute text-sm text-red-500">{error.message}</p>}
    </div>
  );
};