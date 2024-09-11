import clsx from "clsx";
import { ReactNode } from "react";

interface ISwitcher {
  isToggled: boolean;
  onToggle: () => void;
  className?: string;
  icons?: { left: ReactNode, right: ReactNode };
}

export const Switcher = ({ isToggled, onToggle, icons, className }: ISwitcher) => {
  return (
    <label className={clsx(className, "relative box-border w-12 h-6 cursor-pointer")}>
      <input
        type="checkbox"
        className="peer hidden"
        checked={isToggled}
        onChange={onToggle}
      />
      <span
        className="absolute inset-0 box-border border border-secondary h-6 
          rounded-full bg-white peer-checked:before:translate-x-6 
          dark:bg-whiteDark dark:border-whiteDark
          before:absolute before:content-[''] before:-left-[1px] before:-top-[1px] before:w-6 before:h-6 
          before:bg-secondary before:border-0 before:rounded-full before:transition-transform
          dark:before:bg-primaryDark
        "
      />
      {icons?.left}
      {icons?.right}
    </label>
  );
};
