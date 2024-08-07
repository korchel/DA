import { DetailedHTMLProps, ForwardedRef, forwardRef, HtmlHTMLAttributes } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { ICreateDocForm } from "../ModalComponent/document/CreateDocument";

interface ICheckBox extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLInputElement>, HTMLInputElement>  {
  label: string,
  onChange: (e: any) => void,

  setValue: any
}


export const CheckBox = ({label, onChange, ...props}: ICheckBox) => {


  return (
    <label htmlFor="check">{label}
      <input id="check" type="checkbox" {...props} onChange={onChange} />
    </label>
  );
};