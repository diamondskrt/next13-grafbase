'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Icon from './Icon';

const AppLogo = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState('text-black');

  useEffect(() => {
    setColor(theme === 'light' ? 'text-black' : 'text-white');
  }, [color, theme, setColor]);

  return <Icon name="logo" size={28} className={color} />;
};

export default AppLogo;
