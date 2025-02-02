interface Colors {
  readonly main: string;
  readonly dark: string;
  readonly contrastText: string;
}

interface TextColors {
  readonly primary: string;
  readonly placeholder: string;
}

interface TextProps {
  readonly fontSize: number;
  readonly fontFamily: string;
}

export interface ThemePalette {
  readonly primary: Colors;
  readonly secondary: Colors;
  readonly background: string;
  readonly success: string;
  readonly error: string;
  readonly text: TextColors;
  readonly disabled: string;
  readonly pane: string;
}

export interface ThemeTypography {
  readonly h5: TextProps;
  readonly h6: TextProps;
  readonly p: TextProps;
  readonly span: TextProps;
}

export interface Theme {
  readonly palette: ThemePalette;
  readonly typography: ThemeTypography;
}
