import React, { useState } from 'react';
import { Text, StyleSheet, Pressable, type PressableProps } from 'react-native';

interface Props extends PressableProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export default function IconButton({
  children,
  disabled = false,
  ...rest
}: Props): React.JSX.Element {
  const [press, setPress] = useState<boolean>(false);

  return (
    <Pressable
      disabled={disabled}
      onPressIn={() => {
        setPress(true);
      }}
      onPressOut={() => {
        setPress(false);
      }}
      {...rest}
    >
      <Text style={press ? styles.pressed : styles.notPressed}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    color: '#AEE6F8'
  },
  notPressed: {
    color: '#d1d5db'
  }
});
