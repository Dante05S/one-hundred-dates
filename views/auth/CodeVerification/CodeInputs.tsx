import TextField from 'components/Inputs/TextField';
import React, { type RefObject, useRef } from 'react';
import {
  StyleSheet,
  View,
  type TextInput,
  type TextInputKeyPressEventData
} from 'react-native';
import { type NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes';

export interface ICodeInputs {
  sms_token1: string;
  sms_token2: string;
  sms_token3: string;
  sms_token4: string;
}

interface Props {
  codeInputs: ICodeInputs;
  onChange: (newCodeInputs: ICodeInputs) => void;
}

export default function CodeInputs({
  codeInputs,
  onChange
}: Props): React.JSX.Element {
  const codeInput1 = useRef<TextInput>(null);
  const codeInput2 = useRef<TextInput>(null);
  const codeInput3 = useRef<TextInput>(null);
  const codeInput4 = useRef<TextInput>(null);

  const skipNextInput = (
    text: string,
    name: string,
    ref: RefObject<TextInput> | null
  ): void => {
    onChange({
      ...codeInputs,
      [name]: text.trim()
    });

    if (
      text.trim().length > 0 &&
      ref?.current !== null &&
      ref?.current !== undefined
    ) {
      ref?.current.focus();
    } else if (text.trim().length > 0 && ref === null) {
      codeInput4.current?.blur();
    }
  };

  const backInput = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    name: keyof typeof codeInputs,
    ref: RefObject<TextInput> | null
  ): void => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      codeInputs[name].length === 0 &&
      ref?.current !== null &&
      ref?.current !== undefined
    ) {
      ref?.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <TextField
        ref={codeInput1}
        type="numeric"
        maxLength={1}
        id="digit1"
        name="sms_token1"
        onChangeText={(value) => {
          skipNextInput(value, 'sms_token1', codeInput2);
        }}
        onKeyPress={(e) => {
          backInput(e, 'sms_token1', null);
        }}
        variant="code"
        value={codeInputs?.sms_token1 ?? ''}
      />
      <TextField
        ref={codeInput2}
        id="digit2"
        name="sms_token2"
        onChangeText={(value) => {
          skipNextInput(value, 'sms_token2', codeInput3);
        }}
        onKeyPress={(e) => {
          backInput(e, 'sms_token2', codeInput1);
        }}
        variant="code"
        value={codeInputs?.sms_token2 ?? ''}
      />
      <TextField
        ref={codeInput3}
        id="digit3"
        name="sms_token3"
        onChangeText={(value) => {
          skipNextInput(value, 'sms_token3', codeInput4);
        }}
        onKeyPress={(e) => {
          backInput(e, 'sms_token3', codeInput2);
        }}
        variant="code"
        value={codeInputs?.sms_token3 ?? ''}
      />
      <TextField
        ref={codeInput4}
        id="digit4"
        name="sms_token4"
        onChangeText={(value) => {
          skipNextInput(value, 'sms_token4', null);
        }}
        onKeyPress={(e) => {
          backInput(e, 'sms_token4', codeInput3);
        }}
        variant="code"
        value={codeInputs?.sms_token4 ?? ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
