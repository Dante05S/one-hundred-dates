import React, { forwardRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { type InputModeOptions, type TextInput } from 'react-native';
import Input, { type InputProps } from './Input';
import useFormControl from 'hooks/useFormControl';
import getFormControlState from 'utils/formControlState';

export interface FieldProps extends InputProps {
  startIcon?: React.JSX.Element;
  endIcon?: React.JSX.Element;
  type?: InputModeOptions;
  name?: string;
  error?: boolean;
}

const Field = forwardRef<TextInput, FieldProps>(function Field(
  { startIcon, endIcon, type, defaultValue = '', name = '', error, ...rest },
  ref
): React.JSX.Element {
  const [focus, setFocus] = useState<boolean>(false);
  const muiFormControl = useFormControl();

  const formControlState = getFormControlState(
    { error },
    ['error'],
    muiFormControl
  );

  const getBorderColor = (): { borderColor: string } => {
    return formControlState.error ?? false
      ? styles.error
      : styles.inputNoFocues;
  };

  return (
    <View style={{ position: 'relative' }}>
      {startIcon}
      <Input
        ref={ref}
        selectionColor="#94a3b8"
        style={[styles.input, focus ? styles.inputFocus : getBorderColor()]}
        name={name}
        type={type}
        {...rest}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
      />
      {endIcon}
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    fontFamily: 'poppins',
    fontSize: 14,
    borderStyle: 'solid',
    borderWidth: 1.7,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  inputNoFocues: {
    borderColor: '#d1d5db'
  },
  inputFocus: {
    borderColor: '#AEE6F8'
  },
  error: {
    borderColor: '#d32f2f'
  }
});

export default Field;
