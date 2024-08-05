import clsx from "clsx";
import { DetailedHTMLProps, ForwardedRef, forwardRef, HtmlHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";
import { ActionButton } from "./ActionButton";

export interface InputFieldProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type?: 'text' | 'email' | 'password',
  id?: string,
  error?: FieldError,
  placeholder: string,
  showActionButton?: boolean,
}

export const InputField = forwardRef(({ type = "text", id, error, placeholder, className, showActionButton = false, ...props }: InputFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [inputType, setInputType] = useState(type);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setPasswordShown((prevState) => !prevState);
    setInputType((prevState) => prevState === 'password' ? 'text' : 'password');
  };

  return (
    <div className={clsx(className, 'relative')}>
      <input
        type={inputType}
        id={id}
        className={clsx(error && "border-red-500", "block p-2 border border-slate-300 outline-sky-500 rounded-sm w-full focus:ring focus:ring-sky-200 focus:ring-opacity-50")}
        placeholder={placeholder}
        {...props}
        ref={ref}
      />
      {!error && showActionButton && <ActionButton className="absolute top-2 right-3" onClick={toggleShowPassword} actionType={passwordShown ? "hidePassword" : "showPassword"} />}
      {error && <p className="absolute text-sm text-red-500">{error.message}</p>}
    </div>
  );
});