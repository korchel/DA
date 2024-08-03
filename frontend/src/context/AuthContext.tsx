import { createContext, useState, useContext, ReactNode, FC } from "react";
import Cookies from "js-cookie";
import { Role } from "../interfaces/interfaces";

// interface userData {
//   jwtToken: string,
//   user: {
//     email: string,
//     idUser: number,
//     userName: string,
//     name: string,
//     roles: {
//       idRole: number,
//       name: Role,
//     }
//   }
// }

interface IAuthContext {
  logIn: () => void;
  logOut: () => void;
  isAuthenticated: boolean;
}

const initialContext = {
  logIn: () => undefined,
  logOut: () => undefined,
  isAuthenticated: false,
}

export const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  const logIn = () => {
    console.log('!!')
    setIsAuthenticated(true);
  };
  const logOut = () => {
    setIsAuthenticated(false);
  };

  const value = {
    logIn,
    logOut,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext) as IAuthContext;

export { AuthProvider, useAuth };