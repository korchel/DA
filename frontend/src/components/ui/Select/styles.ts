import clsx from "clsx";
import { ClassNamesConfig, GroupBase } from "react-select";
import { ISelectOption } from'./../../../interfaces';

export const classNames:  ClassNamesConfig<ISelectOption, true, GroupBase<ISelectOption>> | undefined = {
  control: (state) => clsx(
    'bg-transparent',
    state.isFocused
      ? `ring ring-primary ring-opacity-50 border-primary !outline !outline-1 !outline-primary
        dark:ring-whiteDark dark:!outline-secondaryDark dark:!ring-secondaryDark`
      : 'border-gray dark:border-whiteDark',
    "hover:border-gray dark:hover:border-whiteDark rounded-sm cursor-pointer",
  ),
  valueContainer: () => 'p-1',
  option: ({ isSelected, isFocused }) => clsx(isFocused && !isSelected && '!bg-primary dark:!bg-secondaryDarkHover',
    isSelected && 'bg-secondary', 'cursor-pointer'),
  menu: () => 'z-20 dark:bg-secondaryDark',
};