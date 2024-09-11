import { ReactNode } from "react";
import clsx from 'clsx';

interface IPageTitleProps {
  children: ReactNode;
  className?: string;
}

export const PageTitle = ({children, className}: IPageTitleProps) => {
  return (
    <h1 className={clsx(className, "text-secondary dark:text-whiteDark font-bold text-lg text-center")}>{children}</h1>
  );
};