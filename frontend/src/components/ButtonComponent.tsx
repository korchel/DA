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
      primary: 'bg-cyan-500 hover:bg-cyan-400 text-white',
      outline: 'border border-cyan-500 bg-white text-cyan-500 hover:bg-cyan-50',
    }[variant],

  );
  return (
    <button className={cn} {...props}>
      {children}
    </button>
  );
};