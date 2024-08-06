import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes";
import { ButtonComponent } from "./ButtonComponent";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
  const { t } = useTranslation();
  const { logOut, isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  return (
    <header className="flex h-24 items-center px-8 bg-white drop-shadow-md justify-between">
      <Link to={routes.documentsRoute()}>
        <div className="font-bold text-4xl text-sky-600">DA</div>
      </Link>
      {isAuthenticated && <nav className="flex gap-2">
        <Link to={routes.usersRoute()}>
          <ButtonComponent variant="outline">{t('header.nav.users')}</ButtonComponent>
        </Link>
        <Link to={routes.filesRoute()}>
          <ButtonComponent variant="outline">{t('header.nav.files')}</ButtonComponent>
        </Link>
        <Link to={routes.documentsRoute()}>
          <ButtonComponent variant="outline">{t('header.nav.documents')}</ButtonComponent>
        </Link>
        <ButtonComponent variant="outline">{t('header.nav.search')}</ButtonComponent>
      </nav>}
      <div className="flex gap-2">
        {pathname === routes.loginRoute() && <Link to={routes.signupRoute()}>
          <ButtonComponent variant="outline">{t('header.register')}</ButtonComponent>
        </Link>}
        {pathname === routes.signupRoute() && <Link to={routes.loginRoute()}>
          <ButtonComponent variant="outline">{t('header.login')}</ButtonComponent>
        </Link>}
        {isAuthenticated && <Link to={routes.loginRoute()}>
          <ButtonComponent onClick={logOut} variant="outline">{t('header.logout')}</ButtonComponent>
        </Link>}
      </div>
    </header>
  )
};