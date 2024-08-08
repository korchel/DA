import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

interface ICheckBox extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLInputElement>, HTMLInputElement>  {
  label: string,
  onChange?: (e: any) => void,
  value?: any
  setValue?: any
}

export const CheckBox = ({label, value, onChange, ...props}: ICheckBox) => {


  return (
    <label htmlFor="check" className="block">{label}
      <input value={value} id={label} type="checkbox" {...props} onChange={onChange} />
    </label>
  );
};

