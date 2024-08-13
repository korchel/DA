import clsx from "clsx";
import { DetailedHTMLProps, ForwardedRef, forwardRef, TextareaHTMLAttributes } from "react";

import { FieldError } from "react-hook-form";
import { InputLabel } from "./InputLabel";
import { ErrorMessage } from "./ErrorMessage";

export interface ITextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  error?: FieldError,
  placeholder?: string,
  label?: string,
  required?: boolean,
}

export const TextArea = forwardRef(({ error, placeholder, label, required = true, className, ...props }: ITextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {

  return (
    <div className={clsx(className, 'relative')}>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <textarea
        className={clsx(error ? "border-red-500" : 'border-slate-300', "block p-2 border classNames outline-sky-500 rounded-sm w-full focus:ring focus:ring-sky-200 focus:ring-opacity-50 min-h-44")}
        placeholder={placeholder}
        {...props}
        ref={ref}
        id={label}
      />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
});