import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface IErrorMessage extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  children: ReactNode,
}

export const ErrorMessage = ({ children, className }: IErrorMessage) => (
  <p className={clsx(className, "absolute text-sm text-red-500")}>
    {children}
  </p>
);