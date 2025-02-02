import { createTheme } from 'helpers/createTheme';

const theme = createTheme({
  palette: {
    primary: {
      main: '#51C4F1',
      dark: '#48b0d8'
    },
    secondary: {
      main: '#FACFE4'
    },
    success: '#51C4F1',
    error: '#d32f2f',
    disabled: '#d1d5db'
  },
  typography: {
    p: {
      fontSize: 13
    },
    span: {
      fontSize: 11
    }
  }
});

export default theme;
