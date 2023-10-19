import React from 'react';
import { StyleSheet } from 'react-native';
import Paragraph, { type ParagraphProps } from 'components/Paragraph';
import useFormControl from 'hooks/useFormControl';
import getFormControlState from 'utils/formControlState';

interface Props extends ParagraphProps {
  children: React.ReactNode;
  required?: boolean;
  error?: boolean;
}

export default function InputLabel({
  children,
  required,
  error,
  ...rest
}: Props): React.JSX.Element {
  const muiFormControl = useFormControl();

  const formControlState = getFormControlState(
    { error, required },
    ['error', 'required'],
    muiFormControl
  );

  return (
    <Paragraph
      style={[
        styles.label,
        formControlState.error ?? false ? styles.error : {}
      ]}
      {...rest}
    >
      {(formControlState.required ?? false) && (
        <Paragraph style={styles.required}>*</Paragraph>
      )}
      {children}
    </Paragraph>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    marginVertical: 2,
    paddingLeft: 4
  },
  required: {
    fontSize: 14,
    color: '#AEE6F8'
  },
  error: {
    color: '#d32f2f'
  }
});
