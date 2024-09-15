import clsx from "clsx";
import { ClassNamesConfig, GroupBase } from "react-select";
import { ISelectOption } from'./../../../interfaces';

export const classNames:  ClassNamesConfig<ISelectOption, true, GroupBase<ISelectOption>> | undefined = {
  control: (state) => clsx(
    'bg-transparent',
    state.isFocused
      ? `ring ring-primary ring-opacity-50 border-gray
        dark:ring-whiteDark dark:!ring-primaryDark`
      : 'border-gray dark:border-whiteDark',

    "hover:border-gray dark:hover:border-whiteDark rounded-sm cursor-pointer",
  ),
  valueContainer: () => 'p-1',
  option: ({ isSelected, isFocused }) => clsx(isFocused && !isSelected && '!bg-primary dark:!bg-secondaryDarkHover',
    isSelected && 'bg-secondary', 'cursor-pointer'),
  menu: () => 'z-20 dark:bg-secondaryDark',
  placeholder: () => "text-gray dark:text-whiteDark",
  singleValue: () => "text-gray dark:text-whiteDark",
  multiValue: () => "text-gray dark:text-whiteDark bg-primary dark:bg-primaryDark",
  multiValueLabel: () => "text-gray dark:text-whiteDark bg-primary dark:bg-primaryDark",
  clearIndicator: () => "text-gray dark:text-whiteDark",
  dropdownIndicator: () => "text-gray dark:text-whiteDark",
};