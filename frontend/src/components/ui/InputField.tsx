import clsx from "clsx";
import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";
import { ActionButton } from "./ActionButton";
import { InputLabel } from "./InputLabel";
import { ErrorMessage } from "./ErrorMessage";

export interface InputFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'number',
  id?: string,
  error?: FieldError,
  placeholder?: string,
  label?: string,
  showActionButton?: boolean,
}

export const InputField = forwardRef(({
  type = "text", id, error, placeholder, label,
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
        className={clsx(error ? "border-red-500" : 'border-slate-300', "block p-2 border  outline-sky-500 rounded-sm w-full focus:ring focus:ring-sky-200 focus:ring-opacity-50")}
        placeholder={placeholder}
        {...props}
        ref={ref}
      />
      {!error && showActionButton && <ActionButton className="absolute top-2 right-3" onClick={toggleShowPassword} actionType={passwordShown ? "hidePassword" : "showPassword"} />}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
});