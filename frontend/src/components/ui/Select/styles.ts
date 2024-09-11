import clsx from "clsx";
import { ClassNamesConfig, GroupBase } from "react-select";
import { ISelectOption } from'./../../../interfaces';

export const classNames:  ClassNamesConfig<ISelectOption, true, GroupBase<ISelectOption>> | undefined = {
  control: (state) => clsx(
    'bg-white',
    state.isFocused ? 'ring ring-primary ring-opacity-50 border-primary !outline !outline-1 !outline-primary' : 'border-gray', "hover:border-gray rounded-sm cursor-pointer"
  ),
  valueContainer: () => 'p-1',
  option: ({ isSelected, isFocused }) => clsx(isFocused && !isSelected && '!bg-primary', isSelected && 'bg-secondary', 'cursor-pointer'),
  menu: () => 'z-20',
};