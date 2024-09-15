import clsx from "clsx";
import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";
import { ActionButton } from "./ActionButton";
import { InputLabel } from "./InputLabel";
import { ErrorMessage } from "./ErrorMessage";

export interface InputFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'number',
  error?: FieldError,
  placeholder?: string,
  label?: string,
  showActionButton?: boolean,
}

export const InputField = forwardRef(({
  type = "text", error, placeholder, label,
  className, showActionButton = false, ...props }: InputFieldProps,
  ref: ForwardedRef<HTMLInputElement>) => {
  const [inputType, setInputType] = useState(type);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setPasswordShown((prevState) => !prevState);
    setInputType((prevState) => prevState === 'password' ? 'text' : 'password');
  };

  return (
    <div className={clsx(className, 'relative')}>
      {label && <InputLabel htmlFor={label}>{label}</InputLabel>}
      <input
        type={inputType}
        id={label}
        className={clsx(error ? "border-danger" : 'border-gray',
          "block p-2 border bg-transparent outline-primary rounded-sm w-full",
          "focus:ring focus:ring-primary focus:ring-opacity-50",
          "dark:border-whiteDark dark:outline-secondaryDark dark:focus:ring-secondaryDark",
          "autofill:shadow-[inset_0_0_0px_1000px_var(--white-color)] autofill:[-webkit-text-fill-color:_var(--secondary-color)]",
          "dark:autofill:shadow-[inset_0_0_0px_1000px_var(--secondary-dark-color)] dark:autofill:[-webkit-text-fill-color:_var(--white-dark-color)]",
        )}
        placeholder={placeholder}
        {...props}
        ref={ref}
      />
      {!error && showActionButton && <ActionButton
        className="absolute top-2 right-3"
        onClick={toggleShowPassword}
        actionType={passwordShown ? "hidePassword" : "showPassword"}
      />}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
});