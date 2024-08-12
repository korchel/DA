import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import {
  DeleteIcon, EditIcon, EyeIcon, CrossedEyeIcon,
  CloseIcon, DownloadIcon, OverviewIcon
} from "./icons";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  actionType: 'delete' | 'edit' | 'showPassword' | 'hidePassword' | 'close' | 'download' | 'overview',
}

export const ActionButton = ({ actionType, className, ...props }: ButtonProps) => {
  const Icon = {
    delete: <DeleteIcon />,
    edit: <EditIcon />,
    showPassword: <EyeIcon />,
    hidePassword: <CrossedEyeIcon />,
    close: <CloseIcon />,
    download: <DownloadIcon />,
    overview: <OverviewIcon />
  }[actionType];

  return (
    <button type="button" {...props} className={clsx(className, 'text-sky-600')}>
      {Icon}
    </button>
  );
};