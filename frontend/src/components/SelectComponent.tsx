import { useMemo,  } from 'react';
import { FieldError } from 'react-hook-form';
import Select, { type ActionMeta } from 'react-select';
import clsx from 'clsx';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { InputLabel } from './ui/InputLabel';

interface ISelectOption {
  label: string,
  value: number,
}

interface ISelectInputProps {
  onChange: (option: number) => void,
  placeholder: string,
  className?: string,
  error?: FieldError,
  value?: number,
  label?: string,
}

type onSelect = (newValue: unknown, actionmeta: ActionMeta<unknown>) => void;

const selectOptions: ISelectOption[] = [
  { value: 1, label: 'Заметка' },
  { value: 2, label: 'Отчет' },
  { value: 3, label: 'Презентация' },
  { value: 4, label: 'Статья' },
  { value: 5, label: 'По умолчанию???' },
];

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

const classNames = {
  control: () => "border-slate-300 shadow-none rounded-sm !active:border-red-300",
  valueContainer: () => 'p-1',
  option: ({ isSelected, isFocused }) => clsx(isFocused && !isSelected && '!bg-sky-200', isSelected && 'bg-sky-500'),
  menu: () => 'z-20',
};

export const SelectComponent = ({ onChange, label, placeholder, error, value, ...props }: ISelectInputProps) => {
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
        {error && <p className="absolute text-sm text-red-500">{error.message}</p>}
      </div>
    </EmotionCacheProvider>
  );
};