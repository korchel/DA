import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

export const useClickOutside = (callback) => {
  const ref = useRef(null);

  useOnClickOutside(ref, callback);
  return ref;
};