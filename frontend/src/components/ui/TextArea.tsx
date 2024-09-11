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
        className={clsx(error ? "border-danger" : 'border-gray',
          "block p-2 min-h-44",
          "border outline-primary rounded-sm w-full bg-transparent focus:ring focus:ring-primary focus:ring-opacity-50",
          "dark:border-whiteDark dark:outline-secondaryDark dark:focus:ring-secondaryDark",
        )}
        placeholder={placeholder}
        {...props}
        ref={ref}
        id={label}
      />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
});