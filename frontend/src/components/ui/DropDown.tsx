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
    setMenuOpen(false);
    action(param);
  };

  const handleOpenMenu = () => {
    setMenuOpen((state) => !state);
  };

  return (
    <div className={clsx(className, 'relative')}>
      <ButtonComponent variant="outline" onClick={handleOpenMenu}>{name}</ButtonComponent>
      <div className={clsx(menuOpen ? 'block' : 'hidden', 'absolute right-0 top-10')}>
        {
          Object.keys(options).map((option) => (
            <ButtonComponent
              variant="borderLess"
              className="w-full text-right rounded-none"
              onClick={(e) => handleChooseOption(e)}
              data-param={option}
              key={option}
            >
              {options[option]}
            </ButtonComponent>
          ))
        }
      </div>
    </div>
  );
};
