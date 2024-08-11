import clsx from "clsx";
import { DetailedHTMLProps, ForwardedRef, forwardRef, HtmlHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";
import { InputLabel } from "./InputLabel";

export interface ITextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  error?: FieldError,
  placeholder?: string,
  label?: string,
}

export const TextArea = forwardRef(({ error, placeholder, label, className, ...props }: ITextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {


  return (
    <div className={clsx(className, 'relative')}>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <textarea
        className={clsx(error && "border-red-500", "block p-2 border classNames outline-sky-500 rounded-sm w-full focus:ring focus:ring-sky-200 focus:ring-opacity-50 min-h-44")}
        placeholder={placeholder}
        {...props}
        ref={ref}
        id={label}
      />
        {error && <p className="absolute text-sm text-red-500">{error.message}</p>}
    </div>
  );
});