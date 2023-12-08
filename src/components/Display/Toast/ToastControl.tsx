import ToastControlContext from 'context/ToastControlContext';
import React, { useState } from 'react';
import Toast from '.';

interface Props {
  children: React.ReactNode;
}

export default function ToastControl({ children }: Props): React.JSX.Element {
  const [message, setMessage] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  const alertToast = (value: string): void => {
    setMessage(value);
    setShow(true);
  };

  const onClose = (): void => {
    setShow(false);
  };

  return (
    <ToastControlContext.Provider
      value={{
        message,
        alertToast
      }}
    >
      <Toast message={message} show={show} onClose={onClose} />
      {children}
    </ToastControlContext.Provider>
  );
}
