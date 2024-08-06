import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface ICard extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  children: ReactNode
}

export const Card = ({children}: ICard) => (
  <div className="bg-white w-1/2 p-4 rounded-md shadow-lg">
    {children}
  </div>
);

Card.Header = ({ children }) => (
  <h1 className="font-bold text-center uppercase">{children}</h1>
);

Card.Body = ({ children }) => (
  <div  className="mt-5">
    {children}
  </div>
);

Card.Footer = ({ children }) => (
  <div className="flex justify-between mt-5">
    {children}
  </div>
);
