import { DetailedHTMLProps, ForwardedRef, forwardRef, HtmlHTMLAttributes } from "react";

interface ICheckBox extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLInputElement>, HTMLInputElement>  {
  label: string,
  onChange?: (e: any) => void,
  value?: any,
  checked?: boolean,
}

export const CheckBox = ({label, value, checked, onChange, ...props}: ICheckBox) => {


  return (
    <label htmlFor={label} className="block">{label}
      <input
        id={label}
        type="checkbox"
        onChange={onChange}
        checked={checked}
        value={value}
        className="mx-2"
        {...props}
      />
    </label>
  );
};

