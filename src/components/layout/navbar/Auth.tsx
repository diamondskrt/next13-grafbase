'use client';

import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import { getProviders, signIn } from 'next-auth/react';
import Button from '@/components/Button';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
}

type Providers = Record<string, Provider>;

interface AuthProps {
  className?: string;
  btnColor?: string;
}

const Auth: FC<AuthProps> = ({ className }) => {
  const [providers, setProviders] = useState<Providers | null>(null);

  const { theme } = useTheme();

  const fetchProviders = async () => {
    const res = await getProviders();

    setProviders(res);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  if (!providers) return null;

  return (
    <div className={classNames(className)}>
      {Object.values(providers).map((provider: Provider, index) => (
        <Button
          color={theme === 'light' ? 'dark' : 'light'}
          key={index}
          onClick={() => signIn(provider?.id)}
        >
          Sign In
        </Button>
      ))}
    </div>
  );
};

export default Auth;
