import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import {
  DeleteIcon, EditIcon, EyeIcon, CrossedEyeIcon,
  CloseIcon, DownloadIcon, OverviewIcon,
  MenuIcon
} from "./icons";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  actionType: 'delete' | 'edit' | 'showPassword' | 'hidePassword' | 'close' | 'download' | 'overview' | 'openMenu',
}

export const ActionButton = ({ actionType, className, ...props }: ButtonProps) => {
  const Icon = {
    delete: <DeleteIcon />,
    edit: <EditIcon />,
    showPassword: <EyeIcon />,
    hidePassword: <CrossedEyeIcon />,
    close: <CloseIcon />,
    download: <DownloadIcon />,
    overview: <OverviewIcon />,
    openMenu: <MenuIcon />,
  }[actionType];

  return (
    <button type="button" {...props} className={clsx(className, 'text-secondary')}>
      {Icon}
    </button>
  );
};