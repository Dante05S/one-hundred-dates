import Paragraph from 'components/Paragraph';
import React, { forwardRef } from 'react';
import {
  StyleSheet,
  Pressable,
  type PressableProps,
  View,
  ActivityIndicator
} from 'react-native';

interface Props extends PressableProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<View, Props>(function Button(
  { children, loading = false, disabled = false, ...rest },
  ref
): React.JSX.Element {
  return (
    <Pressable
      ref={ref}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        pressed && (!disabled || !loading) ? styles.pressed : styles.notPressed,
        disabled || loading ? styles.disabled : {}
      ]}
      {...rest}
    >
      <View style={styles.container}>
        {loading && (
          <View style={styles.containerLoading}>
            <ActivityIndicator color="#AEE6F8" size={25} />
          </View>
        )}
        <Paragraph style={{ color: '#fff', fontSize: 15 }} variant="h1">
          {children}
        </Paragraph>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    padding: 10
  },
  pressed: {
    backgroundColor: '#9ccfdf'
  },
  notPressed: {
    backgroundColor: '#AEE6F8'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLoading: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: 10
  },
  disabled: {
    backgroundColor: '#d1d5db'
  }
});

export default Button;
