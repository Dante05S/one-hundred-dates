import React from 'react';
import { StyleSheet } from 'react-native';
import useFormControl from 'hooks/useFormControl';
import getFormControlState from 'utils/formControlState';
import Paragraph from 'components/Paragraph';

interface Props {
  children: React.ReactNode;
  error?: boolean;
}

export default function FormHelperText({
  children,
  error
}: Props): React.JSX.Element {
  const muiFormControl = useFormControl();

  const formControlState = getFormControlState(
    { error },
    ['error'],
    muiFormControl
  );
  return (
    <>
      {children !== undefined && (
        <Paragraph
          style={[
            styles.text,
            formControlState.error ?? false ? styles.error : styles.notError
          ]}
        >
          {(formControlState.error ?? false) && (
            <Paragraph style={(styles.error, { fontSize: 11 })}>*</Paragraph>
          )}
          {children}
        </Paragraph>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 4,
    marginLeft: 8,
    fontSize: 11
  },
  notError: {
    opacity: 0.5
  },
  error: {
    color: '#d32f2f'
  }
});
