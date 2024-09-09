import clsx from "clsx";
import { ClassNamesConfig, GroupBase } from "react-select";
import { ISelectOption } from'./../../../interfaces';

export const classNames:  ClassNamesConfig<ISelectOption, true, GroupBase<ISelectOption>> | undefined = {
  control: (state) => clsx(
    state.isFocused ? 'ring ring-sky-200 ring-opacity-50 border-sky-500 !outline !outline-1 !outline-sky-500' : 'border-slate-300', "hover:border-slate-300 rounded-sm cursor-pointer"
  ),
  valueContainer: () => 'p-1',
  option: ({ isSelected, isFocused }) => clsx(isFocused && !isSelected && '!bg-sky-200', isSelected && 'bg-sky-500', 'cursor-pointer'),
  menu: () => 'z-20',
};