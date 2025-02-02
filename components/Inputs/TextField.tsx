// React
import React, { forwardRef } from 'react';
import { type TextInput } from 'react-native';

// Components
import InputLabel from './InputLabel';
import FormControl from '../Form/FormControl';
import FormHelperText from 'components/Form/FormHelperText';
import Field, { type FieldProps } from './Field';
import useForm from 'hooks/useForm';

interface Props extends FieldProps {
  children?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  label?: string;
  name?: string;
  color?: 'primary' | 'primary-font';
}

const TextField = forwardRef<TextInput, Props>(function TextField(
  {
    children,
    error,
    helperText,
    label,
    required,
    name,
    type = 'text',
    color = 'primary-font',
    ...rest
  },
  ref
): React.JSX.Element {
  const muiForm = useForm();

  return (
    <FormControl
      error={
        (error ?? false) || muiForm?.errors.some((err) => err.field === name)
      }
      required={required}
    >
      {label !== undefined && <InputLabel>{label}</InputLabel>}
      <Field ref={ref} type={type} name={name} {...rest} />
      <FormHelperText>
        {(helperText !== undefined &&
          (muiForm === undefined ||
            !muiForm?.errors.some((err) => err.field === name))) ||
        (helperText !== undefined && (error ?? false))
          ? helperText
          : muiForm?.errors.find((err) => err.field === name)?.error}
      </FormHelperText>
    </FormControl>
  );
});

export default TextField;
