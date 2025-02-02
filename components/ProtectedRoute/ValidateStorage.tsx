import React from 'react';
import { Redirect, RedirectProps } from 'expo-router';
import useStorageValue from 'hooks/useStorageValue';

interface Props {
  children: React.ReactNode;
  redirect: RedirectProps['href'];
  keyStorage: string;
  redirectWhenExist?: boolean;
}

export default function ValidateStorage({
  children,
  redirect,
  keyStorage,
  redirectWhenExist = false
}: Props): React.JSX.Element {
  const value = useStorageValue(keyStorage);

  if (!redirectWhenExist && value === null) {
    return <Redirect href={redirect} />;
  }

  if (redirectWhenExist && value !== null) {
    return <Redirect href={redirect} />;
  }

  return <>{children}</>;
}
