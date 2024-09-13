import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, ForwardedRef, forwardRef } from "react";

import {
  DeleteIcon, EditIcon, EyeIcon, CrossedEyeIcon,
  CloseIcon, DownloadIcon, OverviewIcon,
  MenuIcon
} from "./icons";
import { SearchIcon } from "./icons/SearchIcon";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  actionType: 'delete' | 'edit' | 'showPassword' | 'hidePassword' | 'close' | 'download' | 'overview' | 'openMenu' | 'search',
}

export const ActionButton = forwardRef(({ actionType, className, ...props }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const Icon = {
    delete: <DeleteIcon />,
    edit: <EditIcon />,
    showPassword: <EyeIcon />,
    hidePassword: <CrossedEyeIcon />,
    close: <CloseIcon />,
    download: <DownloadIcon />,
    overview: <OverviewIcon />,
    openMenu: <MenuIcon />,
    search: <SearchIcon />,
  }[actionType];

  return (
    <button
      type="button"
      {...props}
      className={clsx(
        className,
        'text-secondary hover:text-secondaryHover dark:text-whiteDark dark:hover:text-whiteDarkHover'
      )}
      ref={ref}
    >
      {Icon}
    </button>
  );
});