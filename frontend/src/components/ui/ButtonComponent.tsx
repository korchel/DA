import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, ForwardRefExoticComponent } from "react";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant: 'primary' | 'outline' | 'danger' | 'highLighted' | 'borderLess',
}

export const ButtonComponent = ({ variant, className, children, ...props }: ButtonProps) => {
  const cn = clsx(
    className,
    'transition-colors',
    'rounded',
    'p-2',
    'leading-none',
    'h-9',
    'cursor-pointer',
    'box-border',
    'text-nowrap',
    {
      primary: `bg-secondary hover:bg-secondaryHover text-white
        dark:bg-secondaryDark dark:hover:bg-secondaryDarkHover dark:text-whiteDark dark:border dark:border-whiteDark`,
      outline: `border-2 border-secondary bg-white text-secondary hover:bg-whiteHover
        dark:border-whiteDark dark:bg-whiteDark dark:text-primaryDark dark:hover:bg-whiteDarkHover`,
      danger: `bg-danger hover:bg-dangerHover text-white 
        dark:bg-dangerDark dark:text-whiteDark`,
      borderLess: `bg-white text-secondary hover:bg-whiteHover !rounded-none
      dark:bg-whiteDark dark:text-primaryDark dark:hover:bg-whiteDarkHover`,
    }[variant],
  );

  return (
    <button className={cn} {...props}>
      {children}
    </button>
  );
};