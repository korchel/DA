import { ForwardedRef, forwardRef } from 'react';
import { FieldError, Merge } from 'react-hook-form';
import Select, { type ActionMeta } from 'react-select';
import { InputLabel } from './ui/InputLabel';

interface ISelectOption {
  label: string,
  value: number,
}

interface ISelectInputProps {
  onChange: (option: ISelectOption[]) => void,
  selectOptions: ISelectOption[],
  placeholder: string,
  className?: string,
  error?: Merge<FieldError, (FieldError | undefined)[]>,
  value?: number[],
  label: string,
  required?: boolean,
}

type onSelect = (newValue: unknown, actionmeta: ActionMeta<unknown>) => void;

export const MultiSelectComponent = forwardRef(({onChange, selectOptions, label, placeholder, error, value = [], required = true, ...props}: ISelectInputProps, ref: ForwardedRef<HTMLSelectElement>) => {
  const handleSelect: onSelect = (options) => {
    const _options = options as  ISelectOption[];
    onChange( _options.map((option: any) => option.value));
  };

  return (
    <div className='relative'>
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        onChange={handleSelect}
        options={selectOptions}
        placeholder={placeholder}
        isMulti
        value={selectOptions.filter((option) => value?.includes(option.value) )}
        {...props}
      />
      {error && <p className="absolute text-sm text-red-500">{error.message}</p>}
    </div>
  );
});