import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditButton } from "../icons/EditButton";
import clsx from "clsx";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  action: 'delete' | 'edit',
}

export const ActionButton = ({ action, className }: ButtonProps) => {
  const Icon = {
    delete: <DeleteIcon />,
    edit: <EditButton />,
  }[action];

  return (
    <button className={clsx(className, 'text-sky-600')}>
      {Icon}
    </button>
  );
};