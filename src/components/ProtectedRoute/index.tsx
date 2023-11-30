import React from 'react';
import ValidateStorage from './ValidateStorage';

interface ValidateTypeToken {
  type: 'token';
}

interface ValidateTypeStorage {
  type: 'storage';
  keyStorage: string;
  redirectWhenExist?: boolean;
}

type Validate = ValidateTypeStorage | ValidateTypeToken;

interface Props {
  children: React.ReactNode;
  redirect: string;
  validate?: Validate;
}

export default function ProtectedRoute({
  children,
  redirect,
  validate = { type: 'token' }
}: Props): React.JSX.Element {
  if (validate.type === 'storage') {
    return (
      <ValidateStorage
        keyStorage={validate.keyStorage}
        redirect={redirect}
        redirectWhenExist={validate.redirectWhenExist}
      >
        {children}
      </ValidateStorage>
    );
  }
  return (
    <>
      <>{children}</>
    </>
  );
}
