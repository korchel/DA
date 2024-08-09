import { ForwardedRef, forwardRef, useState,  } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import Select, { type StylesConfig, type ActionMeta } from 'react-select';

interface ISelectOption {
  label: string,
  value: number,
}


interface ISelectInputProps {
  onChange: (ISelectOption) => void,
  selectOptions: ISelectOption[],
  placeholder: string,
  className?: string,
  error?: string | undefined,
}


type onSelect = (newValue: unknown, actionmeta: ActionMeta<unknown>) => void;

export const MultiSelectComponent = ({onChange, selectOptions, placeholder, ...props}: ISelectInputProps) => {
  const [selected, setSelected] = useState<ISelectOption[]>([]);

  const handleSelect = (options: any) => {
    if (options.length > 0) {
      return onChange(options.map((option: any) => option.value));
    }
    return onChange(options.value)
  }
  return (
    <Select
      onChange={handleSelect}
      options={selectOptions}
      placeholder={placeholder}
      isMulti
      {...props}
    />
  );
};