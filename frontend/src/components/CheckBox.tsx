import { ForwardedRef, forwardRef } from "react";
import { UseFormSetValue } from "react-hook-form";
import { ICreateDocForm } from "./ModalComponent/document/CreateDocument";

interface ICheckBox {
  label: string,
  setValue:  UseFormSetValue<ICreateDocForm>,
}

export const CheckBox = ({label, setValue, ...props}: ICheckBox) => {
  return (
    <label htmlFor="check">{label}
      <input id="check" type="checkbox" {...props} onChange={(e) => setValue('publicDocument', e.target.checked)} />
    </label>
  );
};