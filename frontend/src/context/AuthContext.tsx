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
  logIn: (data: string) => void;
  logOut: () => void;
  userData: string | null;
}

const initialContext = {
  logIn: () => {},
  logOut: () => {},
  userData: '',
}

export const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [userData, setUserData] = useState<string | null>(
    (document.cookie as string) || null,
  );
  
  const logIn = (data: string) => {
    Cookies.set("token", data, { path: "/" });
    setUserData(data);
  };
  const logOut = () => {
    Cookies.remove("token", { path: "/" });
    setUserData(null);
  };

  const value = {
    logIn,
    logOut,
    userData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext) as IAuthContext;

export { AuthProvider, useAuth };