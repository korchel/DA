import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import clsx from "clsx";

import { routes } from "../routes";
import { ButtonComponent, LinkComponent, ActionButton } from "./ui";
import { useAuth } from "../context/AuthContext";

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
      <div className={clsx(menuOpen ? "block" : "hidden", "absolute top-full left-0 md:static md:flex w-full md:justify-between bg-white px-8 md:px-0 pb-8 md:pb-0")}>
        {isAuthenticated && <nav className={'md:flex gap-5 md:ml-20'}>
          <LinkComponent route={routes.usersRoute()} active={pathname === routes.usersRoute()}>
            {t('header.nav.users')}
          </LinkComponent>
          <LinkComponent route={routes.filesRoute()} active={pathname === routes.filesRoute()}>
            {t('header.nav.files')}
          </LinkComponent>
          <LinkComponent route={routes.documentsRoute()} active={pathname === routes.documentsRoute()}>
            {t('header.nav.documents')}
          </LinkComponent>
          <LinkComponent route={''}>
            {t('header.nav.search')}
          </LinkComponent>
        </nav>}
        <div className="md:flex gap-2">
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
      </div>
      
      <ActionButton actionType="openMenu" className="md:hidden" onClick={handleOpenMenu} />
    </header>
  )
};