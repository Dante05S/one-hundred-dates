import InputIcon from 'components/Inputs/InputIcon';
import TextField from 'components/Inputs/TextField';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import useCoupleCode from 'hooks/useCoupleCode';

export default function EnterCode(): React.JSX.Element {
  const { code } = useLocalSearchParams<{ code?: string }>();
  const { inputCode, onInputCode } = useCoupleCode();

  useEffect(() => {
    if (code !== undefined && code.length > 0) onInputCode(code ?? '');
  }, [code]);

  return (
    <View style={{ width: '100%' }}>
      <TextField
        placeholder="Ingresar codigo de pareja"
        onChangeText={onInputCode}
        value={inputCode}
        name="email"
        required
        endIcon={
          <InputIcon position="end">
            <Ionicons name="code-slash" size={22} />
          </InputIcon>
        }
      />
    </View>
  );
}
