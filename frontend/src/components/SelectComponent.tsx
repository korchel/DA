import { ForwardedRef, forwardRef, useMemo,  } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import Select, { type StylesConfig, type ActionMeta } from 'react-select';
import { ICreateDocForm } from './ModalComponent/Create';
import clsx from 'clsx';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

interface ISelectOption {
  label: string,
  value: string,
}

interface ISelectInputProps {
  onChange: (ISelectOption) => void,
  placeholder: string,
  className?: string,
  error?: string | undefined,
}

type onSelect = (newValue: unknown, actionmeta: ActionMeta<unknown>) => void;

const selectOptions: ISelectOption[] = [
  { value: '1', label: 'Заметка' },
  { value: '2', label: 'Отчет' },
  { value: '3', label: 'Презентация' },
  { value: '4', label: 'Статья' },
  { value: '5', label: 'По умолчанию???' },
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
  option: ({ isSelected, isFocused }) => clsx(isFocused && !isSelected && '!bg-sky-200', isSelected && 'bg-sky-500',),
};

export const SelectComponent = ({onChange, placeholder, ...props}: ISelectInputProps) => {
  const handleSelect: onSelect = (option) => {
    const _option = option as ISelectOption;
    onChange(_option.value);
  };
  return (
    <EmotionCacheProvider>
      <Select
        classNames={classNames}
        onChange={handleSelect}
        options={selectOptions}
        placeholder={placeholder}
        {...props}
      />
    </EmotionCacheProvider>
  );
};