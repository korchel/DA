import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { ButtonComponent } from "./ButtonComponent";
import clsx from "clsx";

interface IDropDown extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  name: string;
  options: Record<string, string>;
  action: (param: string) => void;
}

export const DropDown = ({ name, options, action, className }: IDropDown) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleChooseOption = (e) => {
    const param = e.target.dataset.param;
    action(param);
  };

  const handleOpenMenu = () => {
    setMenuOpen((state) => !state);
  };

  return (
    <div className={clsx(className, 'relative')}>
      <ButtonComponent variant="outline" onClick={handleOpenMenu}>{name}</ButtonComponent>
      <div className={clsx(menuOpen ? 'block' : 'hidden', 'absolute right-0')}>
        {
          Object.keys(options).map((option) => (
            <ButtonComponent
              variant="outline"
              className="w-full"
              onClick={(e) => handleChooseOption(e)}
              data-param={option}
            >
              {options[option]}
            </ButtonComponent>
          ))
        }
      </div>
    </div>
  );
};
