import { ReactNode, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Switcher } from './ui';
import { MoonIcon, SunIcon } from './ui/icons';
import clsx from 'clsx';

interface IThemeSwitcher {
  className?: string;
}

export const ThemeSwitcher = ({ className }: IThemeSwitcher) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [isToggled, setIsToggled] = useState(theme == 'dark');

  const handleChengeTheme = () => {
    setIsToggled((state) => !state);
    setTheme(isToggled ? 'light' : 'dark');
  };

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <Switcher
      className={className}
      isToggled={isToggled}
      onToggle={handleChengeTheme}
      icons={{ left: <SunIcon className='absolute text-red-500 z-50' />, right: <MoonIcon className='absolute text-red-500  z-50 right-0  h-5 w-5' /> }}
    />
  );
};