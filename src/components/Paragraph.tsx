import { makeStyles } from 'helpers/makeStyles';
import React from 'react';
import {
  type TextProps,
  Text,
  type StyleProp,
  type TextStyle
} from 'react-native';

export interface ParagraphProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: 'span' | 'p' | 'h5';
}

export default function Paragraph({
  children,
  style = {},
  variant = 'p'
}: ParagraphProps): React.JSX.Element {
  const styles = useStyles({ variant });
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const useStyles = makeStyles(
  (theme, props: Required<Pick<ParagraphProps, 'variant'>>) => {
    return {
      text: {
        color: theme.palette.text.primary,
        fontFamily: theme.typography[props.variant].fontFamily,
        fontSize: theme.typography[props.variant].fontSize
      }
    };
  }
);
