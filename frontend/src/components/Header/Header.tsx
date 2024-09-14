import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import clsx from "clsx";

import { routes } from "../../routes";
import { ButtonComponent, LinkComponent, ActionButton } from "../ui";
import { useAuth } from "../../context/AuthContext";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useClickOutside } from "../../hooks";
import { Label } from "./Label";

export const Header = ({ className }) => {
  const { t } = useTranslation();
  const headerRef = useRef(null);
  const { logOut, isAuthenticated, currentUser } = useAuth();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleClickMenu = () => {
    setMenuOpen(true);
  };

  useClickOutside(headerRef, () => setMenuOpen(false));

  const linkClassnames = `px-2 sm:px-5 md:px-0
    hover:bg-whiteHover md:hover:bg-inherit
    dark:hover:bg-secondaryDarkHover dark:md:hover:bg-inherit`;

  return (
    <header className={clsx(className, "flex items-center bg-white dark:bg-secondaryDark drop-shadow-xl justify-between")}>
      <Label />
      <div ref={headerRef} className={clsx(
        menuOpen ? "block" : "hidden",
        "absolute top-full left-0 md:static md:flex w-full md:justify-between pb-4 md:pb-0 bg-white dark:bg-secondaryDark",
      )}>
        {isAuthenticated && <nav className={'md:flex gap-5 md:ml-20'}>
          <LinkComponent
            route={routes.usersRoute()}
            active={pathname === routes.usersRoute()}
            className={linkClassnames}
          >
            {t('header.nav.users')}
          </LinkComponent>
          <LinkComponent
            route={routes.filesRoute()}
            active={pathname === routes.filesRoute()}
            className={linkClassnames}
          >
            {t('header.nav.files')}
          </LinkComponent>
          <LinkComponent
            route={routes.documentsRoute()}
            active={pathname === routes.documentsRoute()}
            className={linkClassnames}
          >
            {t('header.nav.documents')}
          </LinkComponent>
          <LinkComponent route={routes.searchRoute()} className="hidden md:flex">
            <ActionButton actionType="search" />
          </LinkComponent>
        </nav>}
        <div className="flex gap-2 items-center px-2 sm:px-5 md:px-0 ml-auto">
          <ThemeSwitcher />
          <LanguageSwitcher />
          {pathname === routes.loginRoute() && <Link to={routes.signupRoute()}>
            <ButtonComponent variant="outline">{t('header.signup')}</ButtonComponent>
          </Link>}
          {pathname === routes.signupRoute() && <Link to={routes.loginRoute()}>
            <ButtonComponent variant="outline">{t('header.login')}</ButtonComponent>
          </Link>}
          {isAuthenticated && <Link to={routes.loginRoute()}>
            <ButtonComponent onClick={logOut} variant="outline">{t('header.logout')}</ButtonComponent>
          </Link>}
        </div>
      </div>
      <LinkComponent route={routes.searchRoute()} className="md:hidden flex w-6 ml-auto mr-4">
        <ActionButton actionType="search" className="ml-auto" />
      </LinkComponent>
      <ActionButton actionType="openMenu" className="md:hidden" onClick={handleClickMenu} />
    </header>
  )
};