import clsx from "clsx";
import { DetailedHTMLProps, ForwardedRef, forwardRef, HtmlHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";
import { EyeIcon } from "../icons/EyeIcon";
import { CrossedEyeIcon } from "../icons/CrossedEyeIcon";
import { ActionButton } from "./ActionButton";

export interface InputFieldProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type?: string,
  id: string,
  error?: FieldError,
  placeholder: string,
  isPassword?: boolean,
}

interface passwordInputState {
  action: "hidePassword" | "showPassword",
  type: 'password' | 'text',
}

// separate textfield from password field
export const InputField = forwardRef(({ type = "text", id, error, placeholder, className, isPassword = false, ...props }: InputFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [{ action, type }, setShowPassowrd] = useState<passwordInputState>({action: 'eye', type: 'password'});

  const toggleShowPassword = () => {
    setShowPassowrd((prevState) => !prevState);
  };

  return (
    <div className={clsx(className, 'relative')}>
      <input
        type={type}
        id={id}
        className="block p-2 border outline-sky-500 rounded-sm w-full focus:border-red-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
        placeholder={placeholder}
        {...props}
        ref={ref}
      />
      {isPassword && <ActionButton onClick={toggleShowPassword} action={showPassowrd ? "hidePassword" : "showPassword"} />}
      {error && <p className="absolute text-sm text-red-500">{error.message}</p>}
    </div>
  );
});