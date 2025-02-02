import { Redirect, RedirectProps } from 'expo-router';
import React from 'react';
import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  redirect: RedirectProps['href'];
  validate: () => boolean | Promise<boolean>;
}

export default function ValidateCustom({
  children,
  redirect,
  validate
}: Props): React.JSX.Element {
  const [success, setSuccess] = useState<boolean | null>(null);

  const verify = async (): Promise<void> => {
    const flag = await validate();
    setSuccess(flag);
  };

  useEffect(() => {
    void verify();
  }, []);

  if (success !== null && !success) {
    return <Redirect href={redirect} />;
  }

  return <>{children}</>;
}
