import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, ForwardRefExoticComponent } from "react";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant: 'primary' | 'outline' | 'danger' | 'highLighted' | 'borderLess',
}

export const ButtonComponent = ({ variant, className, children, ...props }: ButtonProps) => {
  const cn = clsx(
    className,
    'transition-colors',
    'rounded-sm',
    'p-2',
    'leading-none',
    'h-9',
    'cursor-pointer',
    'box-border',
    {
      primary: 'bg-secondary dark:bg-primaryDark hover:bg-secondaryHover dark:hover:bg-secondaryDarkHover text-white dark:text-whiteDark dark:border dark:border-whiteDark',
      outline: 'border-2 border-secondary bg-white dark:bg-whiteDark text-secondary dark:text-primaryDark hover:bg-whiteHover dark:hover:bg-whiteDarkHover',
      danger: 'bg-danger dark:bg-dangerDark hover:bg-dangerHover text-white dark:text-whiteDark',
      borderLess: 'bg-white dark:bg-whiteDark text-secondary dark:text-primaryDark hover:bg-whiteDark dark:hover:bg-whiteDarkHover',
    }[variant],
  );

  return (
    <button className={cn} {...props}>
      {children}
    </button>
  );
};