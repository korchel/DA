import { createContext, useState, useContext, ReactNode, FC } from "react";
import Cookies from "js-cookie";

interface IAuthContext {
  logIn: (data: string) => void;
  logOut: () => void;
  userData: string | null;
}

export const AuthContext = createContext<IAuthContext | null>(null);

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