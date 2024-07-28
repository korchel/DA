import { Link, LinkProps } from "react-router-dom";
import { ButtonComponent } from "./ButtonComponent";
import { ForwardRefExoticComponent, HTMLProps, ReactNode } from "react";

interface NavButtonProps extends ForwardRefExoticComponent<LinkProps & HTMLProps<HTMLAnchorElement>> {
  route: string,
  children: ReactNode,
}

export const NavButton = ({ route, children }: NavButtonProps) => {
  return (
    
    <ButtonComponent variant="outline">
      <Link to={route}>
        {children}
      </Link>
    </ButtonComponent>

  );
};