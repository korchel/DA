import { Link } from "react-router-dom";
import { routes } from "../routes";
import { ButtonComponent } from "./ButtonComponent";
import { NavButton } from "./NavButton";

export const Header = () => {
  return (
    <header className="flex h-24 items-center px-8 bg-white drop-shadow-md justify-between">
      <div className="font-bold text-4xl text-cyan-600">DA</div>
      <nav className="flex gap-2">
        <ButtonComponent variant="outline">Пользователи</ButtonComponent>
        <ButtonComponent variant="outline">Файлы</ButtonComponent>
        <ButtonComponent variant="outline">Документы</ButtonComponent>
      </nav>
      <div className="flex gap-2">
        <ButtonComponent variant="outline">Регистрация</ButtonComponent>
        <ButtonComponent as={Link} to={routes.loginRoute()} variant="outline">Войти</ButtonComponent>
        <ButtonComponent variant="outline">Поиск</ButtonComponent>
      </div>
    </header>
  )
};