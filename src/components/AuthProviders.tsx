'use client';

import { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';

import Button from './Button';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
}

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  const fetchProviders = async () => {
    const res = await getProviders();

    setProviders(res);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  if (!providers) return null;

  return (
    <div>
      {Object.values(providers).map((provider: Provider, index) => (
        <Button key={index} onClick={() => signIn(provider?.id)}>
          Sign In
        </Button>
      ))}
    </div>
  );
};

export default AuthProviders;
