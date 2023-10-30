import React, { forwardRef, useState } from 'react';
import { View } from 'react-native';
import { type InputModeOptions, type TextInput } from 'react-native';
import Input, { type InputProps } from './Input';
import useFormControl from 'hooks/useFormControl';
import getFormControlState from 'utils/formControlState';
import { makeStyles } from 'helpers/makeStyles';

export interface FieldProps extends InputProps {
  startIcon?: React.JSX.Element;
  endIcon?: React.JSX.Element;
  type?: InputModeOptions;
  name?: string;
  error?: boolean;
}

interface StylesProps {
  error: boolean;
  focus: boolean;
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
  const styles = useStyles({ focus, error: formControlState?.error ?? false });

  return (
    <View style={{ position: 'relative' }}>
      {startIcon}
      <Input
        ref={ref}
        selectionColor="#94a3b8"
        style={styles.input}
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

const useStyles = makeStyles((theme, props: StylesProps) => {
  const isError = props.error
    ? theme.palette.error
    : theme.palette.text.placeholder;
  return {
    input: {
      fontFamily: 'poppins',
      fontSize: 14,
      borderStyle: 'solid',
      borderWidth: 1.7,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderColor: props.focus ? theme.palette.primary.main : isError
    }
  };
});

export default Field;
