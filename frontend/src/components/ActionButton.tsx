import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import { DeleteIcon } from "../icons/DeleteIcon";
import { EditButton } from "../icons/EditButton";
import { EyeIcon } from "../icons/EyeIcon";
import { CrossedEyeIcon } from "../icons/CrossedEyeIcon";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  action: 'delete' | 'edit' | 'showPassword' | 'hidePassword',
}

export const ActionButton = ({ action, className }: ButtonProps) => {
  const Icon = {
    delete: <DeleteIcon />,
    edit: <EditButton />,
    showPassword: <EyeIcon />,
    hidePassword: <CrossedEyeIcon />
  }[action];

  return (
    <button className={clsx(className, 'text-sky-600')}>
      {Icon}
    </button>
  );
};