import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, ForwardRefExoticComponent } from "react";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant: 'primary' | 'outline' | 'danger',
}

export const ButtonComponent = ({ variant, className, children, ...props }: ButtonProps) => {
  const cn = clsx(
    className,
    'transition-colors',
    'rounded-sm',
    'p-2',
    {
      primary: 'bg-sky-600 hover:bg-sky-500 text-white',
      outline: 'border border-sky-500 bg-white text-sky-500 hover:bg-sky-50',
      danger: 'bg-red-500 hover:bg-red-400 text-white'
    }[variant],

  );
  return (
    <button className={cn} {...props}>
      {children}
    </button>
  );
};