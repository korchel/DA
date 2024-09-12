import { ToastContainer } from "react-toastify";
import { Header } from "./Header";
import { ModalComponent } from "./ModalComponent/ModalComponent";
import { useTheme } from "../context/ThemeContext";

export const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className="h-screen text-black dark:text-whiteDark">
    <Header />
    <main className="h-[calc(100%-96px)] bg-primary dark:bg-primaryDark">
      <div className="h-full p-8 flex flex-col items-center">
        {children}
      </div>
      <ModalComponent />
      <ToastContainer theme={theme} />
    </main>
  </div>
  );
};