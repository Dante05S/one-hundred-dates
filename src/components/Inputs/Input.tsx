/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import useForm from 'hooks/useForm';
import React, { forwardRef } from 'react';
import { useController } from 'react-hook-form';
import {
  type InputModeOptions,
  TextInput,
  type TextInputProps
} from 'react-native';
import { type Control } from 'react-hook-form/dist/types';

export interface InputProps extends TextInputProps {
  type?: InputModeOptions;
  name?: string;
}

interface TextInputControlledProps extends InputProps {
  control: Control;
}

const TextInputControlled = forwardRef<TextInput, TextInputControlledProps>(
  function TextInputControlled(
    { control, type = 'text', name = '', ...rest },
    ref
  ): React.JSX.Element {
    const { field } = useController({
      control,
      name
    });
    return (
      <TextInput
        ref={ref}
        inputMode={type}
        value={field.value}
        onChangeText={field.onChange}
        {...rest}
      />
    );
  }
);

const Input = forwardRef<TextInput, InputProps>(function Input(
  { type = 'text', name = '', ...rest },
  ref
): React.JSX.Element {
  const muiForm = useForm();
  return (
    <>
      {muiForm === undefined ? (
        <TextInput ref={ref} inputMode={type} {...rest} />
      ) : (
        <TextInputControlled
          ref={ref}
          control={muiForm.control}
          name={name}
          type={type}
          {...rest}
        />
      )}
    </>
  );
});

export default Input;
