import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Switcher } from './ui';

export const ThemeSwitcher = () => {
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
    <Switcher isToggled={isToggled} onToggle={handleChengeTheme} />
  );
};