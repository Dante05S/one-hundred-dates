import React from 'react';
import ValidateStorage from './ValidateStorage';
import ValidateCustom from './ValidateCustom';
import ValidateSession from './ValidateSession';
import { RedirectProps } from 'expo-router';

interface ValidateTypeSession {
  type: 'session';
  validateOpen: boolean;
}
interface ValidateTypeStorage {
  type: 'storage';
  keyStorage: string;
  redirectWhenExist?: boolean;
}

interface ValidateTypeCustom {
  type: 'custom';
  validate: () => boolean | Promise<boolean>;
}

type Validate = ValidateTypeStorage | ValidateTypeCustom | ValidateTypeSession;

interface Props {
  children: React.ReactNode;
  redirect: RedirectProps['href'];
  validate: Validate;
}

export default function ProtectedRoute({
  children,
  redirect,
  validate
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

  if (validate.type === 'custom') {
    return (
      <ValidateCustom validate={validate.validate} redirect={redirect}>
        {children}
      </ValidateCustom>
    );
  }

  if (validate.type === 'session') {
    return (
      <ValidateSession validateOpen={validate.validateOpen} redirect={redirect}>
        {children}
      </ValidateSession>
    );
  }

  return (
    <>
      <>{children}</>
    </>
  );
}
