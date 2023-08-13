'use client';

import { FC } from 'react';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import Icon from '@/components/Icon';

interface ThemeSwitcherProps {
  className: string;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={classNames(
        'flexCenter rounded-full w-[42px] h-[42px] theme-hover-dark cursor-pointer',
        className
      )}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Icon name="theme" className="w-6 h-6" />
    </div>
  );
};

export default ThemeSwitcher;
