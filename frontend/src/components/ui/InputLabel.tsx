import { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from "react";

interface IInputLabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  required?: boolean,
  children: ReactNode,
}

export const InputLabel = ({ required = true, children, className, ...props }: IInputLabelProps) => {
  return (
    <label
      className="absolute -top-2.5 left-1 text-slate-500 text-sm bg-white leading-tight mx-2 z-10"
      {...props}
    >
      {children}{required && '*'}
    </label>
  );
};
