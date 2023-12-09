import React, { useState } from 'react';
import CoupleCodeContext from '.';

interface Props {
  children: React.ReactNode;
}

export default function CoupleCodeProvider({
  children
}: Props): React.JSX.Element {
  const [inputCode, setInputCode] = useState<string>('');

  const handleInputCode = (value: string): void => {
    setInputCode(value);
  };

  return (
    <CoupleCodeContext.Provider
      value={{ inputCode, onInputCode: handleInputCode }}
    >
      {children}
    </CoupleCodeContext.Provider>
  );
}
