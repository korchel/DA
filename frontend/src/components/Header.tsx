import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes";
import { ButtonComponent } from "./ui/ButtonComponent";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { ActionButton } from "./ui";
import { useState } from "react";

export const Header = () => {
  const { t } = useTranslation();
  const { logOut, isAuthenticated, currentUser } = useAuth();
  const { pathname } = useLocation();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setMenuOpen((state) => !state);
  };

  return (
    <header className="flex h-24 items-center px-8 bg-white drop-shadow-md justify-between sticky top-0">
      <Link to={routes.documentsRoute()}>
        <div className="font-bold text-4xl text-sky-600">DA</div>
      </Link>
      {isAuthenticated && <nav className="hidden md:flex gap-2">
        <Link to={routes.usersRoute()}>
          <ButtonComponent
            variant={pathname === routes.usersRoute() ? "highLighted" : "outline"}
          >
            {t('header.nav.users')}
          </ButtonComponent>
        </Link>
        <Link to={routes.filesRoute()}>
          <ButtonComponent
            variant={pathname === routes.filesRoute() ? "highLighted" : "outline"}
          >
            {t('header.nav.files')}
          </ButtonComponent>
        </Link>
        <Link to={routes.documentsRoute()}>
          <ButtonComponent
            variant={pathname === routes.documentsRoute() ? "highLighted" : "outline"}
          >
            {t('header.nav.documents')}
          </ButtonComponent>
        </Link>
        <ButtonComponent variant="outline">{t('header.nav.search')}</ButtonComponent>
      </nav>}
      <div className="md:flex gap-2 hidden">
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
      <ActionButton actionType="openMenu" className="md:hidden" onClick={handleOpenMenu} />
    </header>
  )
};