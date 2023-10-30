import { createTheme } from 'helpers/createTheme';

const theme = createTheme({
  palette: {
    primary: {
      main: '#AEE6F8',
      dark: '#9ccfdf'
    },
    secondary: {
      main: '#FACFE4'
    },
    success: '#AEE6F8',
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
