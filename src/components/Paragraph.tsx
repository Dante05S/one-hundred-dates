import React from 'react';
import {
  StyleSheet,
  type TextProps,
  Text,
  type StyleProp,
  type TextStyle
} from 'react-native';

type Variant = keyof typeof styles;

export interface ParagraphProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: Variant;
}

export default function Paragraph({
  children,
  style = {},
  variant = 'p'
}: ParagraphProps): React.JSX.Element {
  return <Text style={[styles[variant], style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  p: {
    fontFamily: 'poppins',
    fontSize: 16
  },
  h1: {
    fontFamily: 'poppins-semibold',
    fontSize: 24
  }
});
