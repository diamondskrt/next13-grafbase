'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Icon from './Icon';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [color, setColor] = useState('text-zinc-700');

  useEffect(() => {
    setColor(theme === 'light' ? 'text-zinc-700' : 'text-white');
  }, [color, theme, setColor]);

  return (
    <div
      className={
        'gridCenter h-10 w-10  rounded-full cursor-pointer transition-all'
      }
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Icon name="theme" size={24} className={color} />
    </div>
  );
};

export default ThemeSwitcher;
