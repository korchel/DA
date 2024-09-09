import { ActionMeta } from "react-select";

export type onSelect = (newValue: unknown, actionmeta: ActionMeta<unknown>) => void;

export interface ISelectOption {
  label: string,
  value: number,
}
