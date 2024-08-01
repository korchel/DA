import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, ForwardRefExoticComponent } from "react";
import { LinkProps } from "react-router-dom";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant: 'primary' | 'outline',
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
    }[variant],

  );
  return (
    <button className={cn} {...props}>
      {children}
    </button>
  );
};