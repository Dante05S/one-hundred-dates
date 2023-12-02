import { createContext } from 'react';
import { type Theme } from 'interfaces/theme.interface';

export interface ThemeState {
  theme: Theme;
}

export const defaultTheme: ThemeState = {
  theme: {
    palette: {
      primary: {
        main: '#2089dc',
        dark: '#186cad',
        contrastText: '#fff'
      },
      secondary: {
        main: '#9c27b0',
        dark: '#7b1fa2',
        contrastText: '#fff'
      },
      background: '#fff',
      success: '#52c41a',
      error: '#ff190c',
      text: {
        primary: '#000',
        placeholder: '#d1d5db'
      },
      disabled: '#E3E6E8',
      pane: 'rgba(46, 44, 54, 0.2)'
    },
    typography: {
      span: {
        fontSize: 14,
        fontFamily: 'poppins'
      },
      h5: {
        fontSize: 24,
        fontFamily: 'poppins-semibold'
      },
      h6: {
        fontSize: 22,
        fontFamily: 'poppins-medium'
      },
      p: {
        fontSize: 16,
        fontFamily: 'poppins'
      }
    }
  }
};

const ThemeContext = createContext<ThemeState>(defaultTheme);

export default ThemeContext;
