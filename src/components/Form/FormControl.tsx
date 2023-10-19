import React, { useMemo } from 'react';
import FormControlContext from 'context/FormControlContext';
import { View } from 'react-native';

export interface FormControlProps {
  children: React.ReactNode;
  error?: boolean;
  required?: boolean;
}

export default function FormControl({
  children,
  error = false,
  required = false
}: FormControlProps): React.JSX.Element {
  const childContext = useMemo(() => {
    return {
      error,
      required
    };
  }, [error, required]);

  return (
    <FormControlContext.Provider value={childContext}>
      <View style={{ display: 'flex' }}>{children}</View>
    </FormControlContext.Provider>
  );
}
