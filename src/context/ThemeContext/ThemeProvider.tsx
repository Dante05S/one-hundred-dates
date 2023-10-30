import React, { useMemo } from 'react';
import ThemeContext from './ThemeContext';
import { type CreateTheme } from 'types/create_theme.type';
import { type Theme } from 'interfaces/theme.interface';

interface Props {
  children: React.ReactNode;
  theme: CreateTheme;
}

export default function ThemeProvider({
  children,
  theme
}: Props): React.JSX.Element {
  const childContext = useMemo(() => {
    return {
      theme: theme as Theme
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={childContext}>
      {children}
    </ThemeContext.Provider>
  );
}
