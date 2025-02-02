import { defaultTheme } from 'context/ThemeContext/ThemeContext';
import merge from 'deepmerge';
import { type CreateTheme } from 'types/create_theme.type';

export const createTheme = (theme: CreateTheme): CreateTheme => {
  return {
    ...theme,
    ...merge<CreateTheme>(defaultTheme.theme, theme)
  };
};
