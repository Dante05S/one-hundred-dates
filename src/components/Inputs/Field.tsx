import React, { forwardRef, useState } from 'react';
import { View } from 'react-native';
import { type InputModeOptions, type TextInput } from 'react-native';
import Input, { type InputProps } from './Input';
import useFormControl from 'hooks/useFormControl';
import getFormControlState from 'utils/formControlState';
import { makeStyles } from 'helpers/makeStyles';

type Variant = 'outlined' | 'code';

export interface FieldProps extends InputProps {
  startIcon?: React.JSX.Element;
  endIcon?: React.JSX.Element;
  type?: InputModeOptions;
  name?: string;
  error?: boolean;
  variant?: Variant;
  maxLength?: number;
}

interface StylesProps {
  error: boolean;
  focus: boolean;
  hasStartIcon: boolean;
  hasEndIcon: boolean;
}

const Field = forwardRef<TextInput, FieldProps>(function Field(
  {
    startIcon,
    endIcon,
    type,
    defaultValue = '',
    variant = 'outlined',
    name = '',
    error,
    maxLength,
    ...rest
  },
  ref
): React.JSX.Element {
  const [focus, setFocus] = useState<boolean>(false);
  const muiFormControl = useFormControl();

  const formControlState = getFormControlState(
    { error },
    ['error'],
    muiFormControl
  );
  const styles = useStyles({
    focus,
    error: formControlState?.error ?? false,
    hasStartIcon: startIcon !== undefined,
    hasEndIcon: endIcon !== undefined
  });

  return (
    <View style={{ position: 'relative' }}>
      {startIcon}
      <Input
        ref={ref}
        selectionColor="#94a3b8"
        style={[styles.input, styles[variant]]}
        name={name}
        type={variant === 'code' ? 'numeric' : type}
        maxLength={variant === 'code' ? 1 : maxLength}
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
      borderStyle: 'solid',
      borderWidth: 1.7,
      borderRadius: 10,
      borderColor: props.focus ? theme.palette.primary.main : isError
    },
    outlined: {
      fontFamily: 'poppins',
      paddingVertical: 10,
      paddingLeft: props.hasStartIcon ? 50 : 20,
      paddingRight: props.hasEndIcon ? 50 : 20
    },
    code: {
      fontFamily: 'poppins-semibold',
      width: 64,
      height: 64,
      fontSize: 25,
      textAlign: 'center',
      paddingTop: 5,
      paddingHorizontal: 16
    }
  };
});

export default Field;
