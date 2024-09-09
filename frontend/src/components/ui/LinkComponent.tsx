import { Link, LinkProps } from "react-router-dom";
import { ForwardRefExoticComponent, HTMLProps, ReactNode, RefAttributes } from "react";
import clsx from "clsx";

interface ILinkComponent {
  route: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export const LinkComponent = ({ route, children, active, className }: ILinkComponent) => {
  return (
    <Link
      to={route}
      className={clsx(
        className,
        "block h-9 leading-9 w-full md:w-fit",
        "text-sky-500 transition-colors",
        active && 'text-sky-700',
        !active && 'hover:bg-sky-100 md:hover:bg-white md:hover:text-sky-400'
      )}
    >
      {children}
    </Link>
  );
};