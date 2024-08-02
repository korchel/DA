import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import { DeleteIcon } from "../icons/DeleteIcon";
import { EditButton } from "../icons/EditButton";
import { EyeIcon } from "../icons/EyeIcon";
import { CrossedEyeIcon } from "../icons/CrossedEyeIcon";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  actionType: 'delete' | 'edit' | 'showPassword' | 'hidePassword',
}

export const ActionButton = ({ actionType, className, onClick }: ButtonProps) => {
  const Icon = {
    delete: <DeleteIcon />,
    edit: <EditButton />,
    showPassword: <EyeIcon />,
    hidePassword: <CrossedEyeIcon />
  }[actionType];

  return (
    <button type="button" onClick={onClick} className={clsx(className, 'text-sky-600')}>
      {Icon}
    </button>
  );
};