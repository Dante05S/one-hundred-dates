// React
import React from 'react';
import { type GestureResponderEvent } from 'react-native';

// Components
import IconButton from './Buttons/IconButton';

// Icons
import { Ionicons } from '@expo/vector-icons';

interface Props {
  show: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function ShowPassword({ show, onPress }: Props): JSX.Element {
  return (
    <IconButton onPress={onPress}>
      {!show ? (
        <Ionicons name="eye" size={22} />
      ) : (
        <Ionicons name="eye-off" size={22} />
      )}
    </IconButton>
  );
}
