import { ForwardedRef, forwardRef, useMemo,  } from 'react';
import { FieldError } from 'react-hook-form';
import Select, { ClassNamesConfig, GroupBase } from 'react-select';
import clsx from 'clsx';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { InputLabel } from './InputLabel';
import { ErrorMessage } from './ErrorMessage';
import { ISelectOption, onSelect } from '../../interfaces';

interface ISelectInputProps {
  onChange: (option: number) => void,
  placeholder: string,
  className?: string,
  error?: FieldError,
  value?: number,
  label?: string,
  selectOptions: ISelectOption[],
}

const EmotionCacheProvider = ({ children }: { children: React.ReactNode }) => {
  const cache = useMemo(
    () =>
      createCache({
        key: 'with-tailwind',
        insertionPoint: document.querySelector('title')!,
      }),
    []
  );
  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

const classNames:  ClassNamesConfig<ISelectOption, false, GroupBase<ISelectOption>> | undefined = {
  control: (state) => clsx(state.isFocused ? 'ring-2 ring-sky-200 ring-opacity-50 border-2 border-sky-500 outline-dotted outline-2 outline-offset-2' : 'border-slate-300', "hover:border-slate-300 rounded-sm cursor-pointer"),
  valueContainer: () => 'p-1',
  option: ({ isSelected, isFocused }) => clsx(isFocused && !isSelected && '!bg-sky-200', isSelected && 'bg-sky-500', 'cursor-pointer'),
  menu: () => 'z-20',
};

export const SelectComponent = forwardRef(({ selectOptions, onChange, label, placeholder, error, value, ...props }: ISelectInputProps, ref: ForwardedRef<HTMLSelectElement>) => {
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